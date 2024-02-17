# Codekids App

## Run backend

```bash
python -m venv .venv
source .venv/bin/activate
cd backend
pip install -r requirements.txt
prisma generate  # needs a running database
python uvicorn src.main:app --reload
```

To startup a local database, you can use the following command:

```bash
cd backend
docker compose up -d
```

## For permission to download the @codekids-vt/rush-hour package

- Create a github [personal access token](https://github.com/settings/tokens)
- give it the `read:packages` permission
- save it to `$NPM_TOKEN` in your environment (optionally in your `.bashrc` or `.zshrc`)

```bash
export NPM_TOKEN=your-token
```

## Run frontend

```bash
cd frontend
npm i
npm start
```