FROM node:14-bullseye-slim
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
