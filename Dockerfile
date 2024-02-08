FROM node:21-alpine3.18

COPY package*.json ./

CMD [ "npm install" ]

COPY . .