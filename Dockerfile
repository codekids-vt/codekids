# pulls image
FROM node:18-alpine3.17
WORKDIR /usr/app
COPY . .
# installs /node_modules
RUN npm install
# exposes port
EXPOSE 3000
# starts client
CMD [ "npm", "run", "dev" ]

# build: docker build -t raseen3/kidata-frontend .        
# run: docker run -itp 3000:3000 raseen3/kidata-frontend