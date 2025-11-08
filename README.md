# Codekids App

## Create env files

```bash
cd backend
cp .env.example .env
cd ../frontend
cp .env.example .env
```

## Run backend

[install uv](https://github.com/astral-sh/uv?tab=readme-ov-file#installation)

```bash
cd backend
uv sync # or pip install .
source .venv/bin/activate
docker compose up -d # to start database & bucket
prisma generate
uvicorn src.main:app --reload --port 8080
```

## Updating Schema Database

```bash
cd backend
uv run prisma migrate dev
```

Prisma studio (visual database editor)

```bash
cd backend && prisma studio
```

## Create Local Minio bucket and set permissions

Install the [minio client mc](https://docs.min.io/docs/minio-client-quickstart-guide.html)

```bash
mc alias set local-codekids http://localhost:9000 minioadmin minioadmin
mc mb local-codekids/test-bucket
mc config host ls # to verify
mc anonymous set download local-codekids/test-bucket
```

## Run frontend

```bash
cd frontend
bun i
bun run start
```

## Checks and Formatting

These commands should be run before pushing code. They will check if the code is formatted correctly and if the tests will pass in the CI.

```bash
cd frontend
bun run format
CI=True bun run build
cd ../backend
black . --check
pyright .
ruff check .
```

To update the frontend client to match backend schema.

```bash
cd frontend
bun run generate
# then change one line back to any because that type is too complicate to type properly
# make sure it looks like this in frontend/src/api/models/Page.ts
#   props?: any;
```

To take a backup of the production database, you can use the following command:

```bash
pg_dump -h endeavour.cs.vt.edu -p 30030 -U postgres -d codekids > codekids-db-$(date +%Y-%m-%d).bak

```

### to install postgres client 16 on ubuntu

https://dev.to/johndotowl/postgresql-16-installation-on-ubuntu-2204-51ia

### to load a backup to your local database

```bash
psql postgres://postgres:password@localhost:5432/codekids < /tmp/codekids-db-2025-04-14.bak
```

### if u have an existing database , you will have to clear the docker volume

```bash
docker stop  backend-db-1 ###(name of your container- using docker ps -q)
docker rm backend-db-1 ###(container id)
docker volume rm backend_postgres-data ###(docker volume ls)
docker compose up -d ###(create a new volume)
```
