FROM node:12-alpine

ENTRYPOINT [ "node", "src/app.js" ]

WORKDIR /app

COPY package* ./

RUN npm install

COPY src/ ./src

ENV BASE_DIR /var/janos
