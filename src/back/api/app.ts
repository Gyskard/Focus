import express, { Application, Request, Response } from 'express';

import sequelize from './modules/db/create_connector';

const app: Application = express();
const port: number = 4001;
const prefix: string = '/api';

sequelize.authenticate();
sequelize.sync();

app.get(`${prefix}/`, (req: Request, res: Response) => res.send('Hello World!'));

// app.put(`${prefix}/person`, (req: Request, res: Response) => createPerson();

app.listen(4001, () => console.log(`API is listening on port ${port}`)); // eslint-disable-line no-console
