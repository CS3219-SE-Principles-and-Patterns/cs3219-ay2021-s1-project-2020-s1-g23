FROM node:12

WORKDIR /usr/src/user
# copy the package.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

ARG DBUSERNAME
ARG DBPASSWORD

ENV DBUSERNAME=${DBUSERNAME} \
    DBPASSWORD=${DBPASSWORD}

EXPOSE 5001
CMD ["node", "index.js"]