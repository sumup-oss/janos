FROM node:22.23.4-alpine3.23@sha256:6abbcf5dd6b231da109bcde1181db1d92bf78015ae1a9514d9807c1f857869db

ENTRYPOINT [ "node", "src/app.js" ]

WORKDIR /app

COPY package* ./

RUN npm install

COPY src/ ./src

ENV BASE_DIR /var/janos
