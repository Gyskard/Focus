docker compose -f docker-compose.api.test.yml up &
./node_modules/.bin/wait-port 4050 &
npm run build
node -r dotenv/config ./build/app.js dotenv_config_path=./test/.env &
./node_modules/.bin/wait-port 4001
~/.jbang/bin/jbang karate@karatelabs ./test/*.feature
docker compose -f docker-compose.api.test.yml down
read