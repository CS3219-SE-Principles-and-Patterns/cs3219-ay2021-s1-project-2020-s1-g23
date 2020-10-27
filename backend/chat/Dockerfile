FROM node:12

WORKDIR /usr/src/chat
# copy the package.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

EXPOSE 5001
CMD ["node", "index.js"]