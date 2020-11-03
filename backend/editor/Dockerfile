FROM node:15-alpine

WORKDIR /usr/src/editor

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

EXPOSE 4001
CMD ["node", "server.js"]