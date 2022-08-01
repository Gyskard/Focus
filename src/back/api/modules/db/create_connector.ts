import { Sequelize } from 'sequelize-typescript';

import Person from './models/person.model';
import Event from './models/event.model';
import File from './models/file.model';
import Picture from './models/picture.model';
import EventPerson from './models/event_person.model';

const sequelize: Sequelize = new Sequelize('focus', 'admin', 'admin', {
  host: process.env.ENV === 'prod' ? 'db' : 'localhost',
  port: process.env.ENV === 'prod' ? 5432 : 4002,
  dialect: 'postgres',
  models: [Person, Event, File, Picture, EventPerson],
});

export default sequelize;
