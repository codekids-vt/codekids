from minio import Minio
from minio.error import S3Error

def main(): 
    client = Minio("127.0.0.1:9000",
               access_key="minioadmin",
               secret_key="minioadmin",
               secure=False)  # Secure=False indicates the connection is not TLS/SSL

    src = "test.txt"

    bucket = "test-bucket"
    dest = "test-file.txt"
    found = client.bucket_exists(bucket)
    if not found:
        client.make_bucket(bucket)
        print("Created bucket", bucket)
    else:
        print("Bucket", bucket, "already exists")

    client.fput_object(
        bucket, dest, src,
    )
    print(
        src, "successfully uploaded as object",
        dest, "to bucket", bucket,
    )

if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)