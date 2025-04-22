from io import BytesIO
from typing import Annotated

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
)  # Secure=False indicates the connection is not TLS/SSL


@image_router.post("/images", tags=["images"])
async def upload_image(
    user: Annotated[User, Depends(get_user)], image: UploadFile = File(...)
) -> Image:

    try:
        bucket_name = settings.MINIO_DEFAULT_BUCKET
        name = image.filename or f"image-{image.content_type}"
        contents = await image.read()
        temp_file = BytesIO(contents)
        client.put_object(
            bucket_name=bucket_name,
            object_name=name,
            data=temp_file,
            length=len(contents),
            content_type=image.content_type or "application/octet-stream",
        )

        temp_file.close()
        endpoint = settings.MINIO_ENDPOINT
        image_url = f"{endpoint}/{bucket_name}/{name}"
        image_obj = await db.image.create(
            {
                "name": name,
                "image_url": image_url,
            }
        )
        return image_obj
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid image data")


@image_router.get("/image/{image_id}", tags=["images"])
async def get_image(image_id: int) -> Image:
    try:
        image = await db.image.find_unique(where={"id": image_id})
        if image is None:
            raise HTTPException(status_code=404, detail="Image not found")
        return image
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")
