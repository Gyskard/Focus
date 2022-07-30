FROM node:alpine3.16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --silent --only=production
RUN npm install --global serve

COPY . .

RUN npm run build

CMD ["serve", "build/"]