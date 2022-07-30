import express, { Application, Request, Response } from 'express';

import sequelize from './modules/db/connection';

const app: Application = express();
const port: number = 4001;
const prefix: string = '/api';

sequelize.authenticate();

app.get(`${prefix}/`, (req: Request, res: Response) => res.send('Hello World!'));

app.listen(4001, () => console.log(`API is listening on port ${port}`)); // eslint-disable-line no-console
