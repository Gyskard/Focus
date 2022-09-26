# Focus

Focus is a web application to store and display photos in a timeline. 

The project is still in development.

Needs more automation for functional test generation and verification of API requests.

## Built With

* React (TypeScript)
* NGINX
* NodeJS (TypeScript)
* Sequelize
* PostgreSQL
* Docker & Docker Compose
* Karate (functional test)

## Prerequisites

* NPM 8
* Node 16
* Docker
* Docker Compose

## Tests

### In local

A script allows you to run functional tests with a specific test API and with an empty test database. A bit dirty but (almost) always works without weird errors.

```
./src/back/api/test.sh
```

You can test the code quality with npm.

```
cd ./src/back/api
npm run code_quality

cd ./src/front
npm run code_quality
```

And directly fix code quality issues

```
cd ./src/back/api
npm run code_quality_fix

cd ./src/front
npm run code_quality_fix
```

### Continuous integration

Code quality is also tested with github actions at each code modification.

## Running

### Development

The default Docker Compose script allows you to launch only the database, database manager and reverse-proxy with Docker for development.

```
docker compose up

cd ./src/back/api
npm run dev

cd ./src/front
npm run dev
```

### Production

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```