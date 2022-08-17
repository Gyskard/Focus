/* eslint-disable consistent-return */

import express, {
  Application, Request, Response, NextFunction,
} from 'express';

import config from 'config';

import * as dotenv from 'dotenv';

import sequelize from './module/db/create_connector';

import { createPerson, updatePerson } from './module/api/repository/person.repository';

dotenv.config();

const dbConfig: { default: number, test: number } = config.get('portConfig');

const app: Application = express();

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use((err: SyntaxError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).send(err.message); // check request body is valid json
  next();
});

const port: number = process.env.ENV === 'test' ? dbConfig.test : dbConfig.default;
const prefix: string = '/api';

(async () => {
  await sequelize.authenticate(); // connect with database
  await sequelize.sync(); // sync models with database tables

  app.get(`${prefix}/`, (req: Request, res: Response) => res.sendStatus(200));

  app.put(`${prefix}/person`, (req: Request, res: Response) => createPerson(req, res));

  app.put(`${prefix}/person/:name`, (req: Request, res: Response) => updatePerson(req, res));

  app.listen(port, () => console.log(`API is listening on port ${port}`)); // eslint-disable-line no-console
})();
