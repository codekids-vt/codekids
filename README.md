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
### to install postgres client 16 on ubuntu
https://dev.to/johndotowl/postgresql-16-installation-on-ubuntu-2204-51ia

### if u have an existing database , you will have to clear the docker volume
```bash
docker stop  backend-db-1 ###(name of your container- using docker ps -q)
docker rm backend-db-1 ###(container id)
docker volume rm backend_postgres-data ###(docker volume ls)
docker compose up -d ###(create a new volume)
```


### to load a backup to your local database
```bash
psql postgres://postgres:password@localhost:5432/codekids < /tmp/codekidsbackup.dump
```
<!-- https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/BasicPointers2.html#what-does-it-mean-to-copy
 https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/QueueLinked.html#id1 -->

 ###to setup prisma
 ```bash
 cd backend
 npx prisma studio
 
 ```