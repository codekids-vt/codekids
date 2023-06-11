# pulls image
FROM node:20-alpine3.17
WORKDIR /app
COPY . .
# installs /node_modules
RUN npm install
# exposes port
EXPOSE 3000
# starts client
CMD [ "npm", "run", "dev" ]