# Codekids App

## Create env

```bash
cd backend
cp .env.example .env
```

## Run backend

```bash
python -m venv .venv
source .venv/bin/activate
cd backend
pip install -r requirements.txt
prisma generate  # needs a running database
uvicorn src.main:app --reload --port 8080
```

To startup a local database, you can use the following command:

```bash
cd backend
docker compose up -d
```

## Run frontend

```bash
cd frontend
npm i
npm start
```

## Checks and Formatting

These commands should be run before pushing code. They will check if the code is formatted correctly and if the tests will pass in the CI.

```bash
cd frontend
npm run format
CI=True npm run build
cd ../backend
black . --check
```

To take a backup of the database, you can use the following command:

```bash
pg_dump -h endeavour.cs.vt.edu -p 30030 -U postgres -d codekids > codekids-db-$(date +%Y-%m-%d).bak
```
