FROM node:14.18.3-alpine as build-stage

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
