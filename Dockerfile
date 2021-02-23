FROM node:12-alpine

ENTRYPOINT [ "node", "src/app.js" ]

WORKDIR /app

RUN wget https://github.com/instrumenta/kubeval/releases/latest/download/kubeval-linux-amd64.tar.gz && \
    tar xf kubeval-linux-amd64.tar.gz && \
    cp kubeval /usr/local/bin

COPY package* ./

RUN npm install

COPY src/ ./src

ENV BASE_DIR /var/janos
