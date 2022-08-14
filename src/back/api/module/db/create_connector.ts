import { Sequelize } from 'sequelize-typescript';

import Person from '../api/model/person.model';
import Event from '../api/model/event.model';
import File from '../api/model/file.model';
import Picture from '../api/model/picture.model';
import EventPerson from '../api/model/event_person.model';

const sequelize: Sequelize = new Sequelize('focus', 'admin', 'admin', {
  host: process.env.ENV === 'prod' ? 'db' : 'localhost',
  port: process.env.ENV === 'prod' ? 5432 : 4002,
  dialect: 'postgres',
  models: [Person, Event, File, Picture, EventPerson],
});

export default sequelize;
