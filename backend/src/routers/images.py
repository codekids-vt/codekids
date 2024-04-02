
from typing import Annotated
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi import HTTPException
from src.db import db
from prisma.models import User
from minio import Minio
from src.auth import get_user
from io import BytesIO

image_router = APIRouter()

client = Minio("127.0.0.1:9000",
               access_key="minioadmin",
               secret_key="minioadmin",
               secure=False)  # Secure=False indicates the connection is not TLS/SSL


@image_router.post("/images", tags=["images"])
async def upload_image(
    user: Annotated[User, Depends(get_user)], name: str, image: UploadFile = File(...)
):
    try:
        contents = await image.read()
        temp_file = BytesIO(contents)
        name = f"{name}.jpg"
        client.put_object(
            bucket_name="test-bucket",
            object_name=name,
            data=temp_file,
            length=len(contents),
            content_type=image.content_type
        )
        
        temp_file.close()
        
        image_url = f"http://127.0.0.1:9000/test-bucket/{name}"
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
async def get_image(image_id: int):
    try:
        image = await db.image.find_unique(where={"id": image_id})
        if image is None:
            raise HTTPException(status_code=404, detail="Image not found")
        return image
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")
