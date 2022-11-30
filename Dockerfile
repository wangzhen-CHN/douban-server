FROM node:alpine

WORKDIR /usr/local/app

COPY package.json .

RUN yarn --production

COPY . .

EXPOSE 8010

CMD ["npm", "start"]