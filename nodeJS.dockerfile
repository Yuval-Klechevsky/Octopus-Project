FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install \
    npm install mongoose \ 
    npm install prom-client express


COPY ./app.js .

EXPOSE 8081

CMD [ "node", "app.js" ]