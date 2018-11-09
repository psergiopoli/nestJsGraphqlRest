FROM node:10.13.0-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk add bash

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Build TS to JS
RUN yarn build:prod

HEALTHCHECK --interval=2m --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1

EXPOSE 3000
CMD [ "yarn", "start:prod" ]


