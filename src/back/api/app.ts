/* eslint-disable consistent-return */

import express, {
  Application, Request, Response, NextFunction,
} from 'express';

import sequelize from './module/db/create_connector';

import createPerson from './module/api/repository/person.repository';


const app: Application = express();

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use((err: SyntaxError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).send(err.message); // check request body is valid json
  next();
});

const port: number = 4001;
const prefix: string = '/api';

(async () => {
  await sequelize.authenticate(); // connect with database
  await sequelize.sync(); // sync models with database tables
  
  app.get(`${prefix}/`, (req: Request, res: Response) => res.sendStatus(200));
  
  app.put(`${prefix}/person`, (req: Request, res: Response) => createPerson(req, res));
  
  app.listen(port, () => console.log(`API is listening on port ${port}`)); // eslint-disable-line no-console
})();