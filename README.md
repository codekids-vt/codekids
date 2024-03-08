# Codekids App

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