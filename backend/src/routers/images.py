from typing import Annotated
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi import HTTPException
from src.db import db
from prisma.models import User
from minio import Minio
from minio.error import S3Error
from src.auth import get_user
from pydantic import BaseModel

image_router = APIRouter()

client = Minio("127.0.0.1:9000",
               access_key="minioadmin",
               secret_key="minioadmin",
               secure=False)  # Secure=False indicates the connection is not TLS/SSL

class ImageCreate(BaseModel):
    name: str
    image: UploadFile = File(...)

@image_router.post("/images", tags=["images"])
async def upload_image(
user: Annotated[User, Depends(get_user)], image_create: ImageCreate
):
    try:
        image_data = await image_create.image.read()
        name = f"{image_create.name}.jpg"
        client.put_object(
            bucket_name="test-bucket",
            object_name=name,
            data=image_data,
            length=len(image_data),
            content_type=image_create.image.content_type
        )    
        image_url = f"http://127.0.0.1:9000/test-bucket/{name}"

        image = await db.image.create(
            {
                "name": name,
                "image_url": image_url,
            }
        )
        return image

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid course data")


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
