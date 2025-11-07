from io import BytesIO
from typing import Annotated
import uuid
import imghdr
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from minio import Minio
from prisma.models import Image, User
from src.auth import get_user
from src.config import settings
from src.db import db

image_router = APIRouter()

client = Minio(
    settings.MINIO_ENDPOINT,
    access_key=settings.MINIO_ROOT_USER,
    secret_key=settings.MINIO_ROOT_PASSWORD,
    secure=False,
)

# Allowed image formats
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


def validate_image(contents: bytes, filename: str) -> tuple[bool, str]:
    """Validate that the file is actually an image"""
    # Check file extension
    extension = Path(filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        return (
            False,
            f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    # Check file size
    if len(contents) > MAX_FILE_SIZE:
        return False, f"File size exceeds {MAX_FILE_SIZE / (1024*1024)}MB limit"

    # Verify file content matches extension (for common formats)
    if extension != ".svg":  # SVG can't be validated with imghdr
        image_type = imghdr.what(None, contents)
        if image_type is None:
            return False, "File content does not appear to be a valid image"

        # Map imghdr types to extensions
        type_map = {"jpeg": [".jpg", ".jpeg"], "png": [".png"], "gif": [".gif"]}
        if image_type in type_map:
            if extension not in type_map[image_type]:
                return (
                    False,
                    f"File extension {extension} does not match content type {image_type}",
                )

    return True, ""


@image_router.post("/images", tags=["images"])
async def upload_image(
    user: Annotated[User, Depends(get_user)], image: UploadFile = File(...)
) -> Image:
    try:
        # Read file contents
        contents = await image.read()

        # Validate image
        is_valid, error_msg = validate_image(contents, image.filename or "")
        if not is_valid:
            raise HTTPException(status_code=400, detail=error_msg)

        # Generate secure filename with UUID
        original_extension = Path(image.filename or "").suffix.lower()
        secure_filename = f"{uuid.uuid4()}{original_extension}"

        # Upload to MinIO
        bucket_name = settings.MINIO_DEFAULT_BUCKET
        temp_file = BytesIO(contents)

        client.put_object(
            bucket_name=bucket_name,
            object_name=secure_filename,
            data=temp_file,
            length=len(contents),
            content_type=image.content_type or "application/octet-stream",
        )

        temp_file.close()

        # Generate URL
        endpoint = settings.MINIO_ENDPOINT
        image_url = f"http://{endpoint}/{bucket_name}/{secure_filename}"

        # Store in database with original filename for reference
        image_obj = await db.image.create(
            {
                "name": image.filename or secure_filename,
                "image_url": image_url,
            }
        )

        return image_obj

    except HTTPException:
        raise
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload image")


@image_router.get("/image/{image_id}", tags=["images"])
async def get_image(
    # Require authentication
    image_id: int,
    user: Annotated[User, Depends(get_user)],
) -> Image:
    try:
        image = await db.image.find_unique(where={"id": image_id})
        if image is None:
            raise HTTPException(status_code=404, detail="Image not found")
        return image
    except HTTPException:
        raise
    except Exception as e:
        print(f"Get image error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@image_router.delete("/image/{image_id}", tags=["images"])
async def delete_image(image_id: int, user: Annotated[User, Depends(get_user)]) -> dict:
    """Delete an image from both database and MinIO"""
    try:
        # Get image record
        image = await db.image.find_unique(where={"id": image_id})
        if image is None:
            raise HTTPException(status_code=404, detail="Image not found")

        # Extract filename from URL
        filename = image.image_url.split("/")[-1]
        bucket_name = settings.MINIO_DEFAULT_BUCKET

        # Delete from MinIO
        try:
            client.remove_object(bucket_name, filename)
        except Exception as e:
            print(f"MinIO deletion error: {e}")
            # Continue even if MinIO deletion fails

        # Delete from database
        await db.image.delete(where={"id": image_id})

        return {"message": "Image deleted successfully"}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Delete error: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete image")
