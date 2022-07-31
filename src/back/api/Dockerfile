FROM node:alpine3.16

WORKDIR /app

ENV ENV=prod

COPY package.json .
COPY package-lock.json .

RUN npm install --silent --only=production
RUN npm install -g pm2

COPY . .

RUN npm run build

CMD ["pm2-runtime", "./build/app.js"]