import { Sequelize } from 'sequelize-typescript';

import Person from '../api/entities/person/model';
import Event from '../api/entities/event/model';
import File from '../api/entities/file/model';
import Picture from '../api/entities/picture/model';
import EventPerson from '../api/entities/event_person/model';

const sequelize: Sequelize = new Sequelize('focus', 'admin', 'admin', {
  host: process.env.ENV === 'prod' ? 'db' : 'localhost',
  port: process.env.ENV === 'prod' ? 5432 : 4002,
  dialect: 'postgres',
  models: [Person, Event, File, Picture, EventPerson],
});

export default sequelize;
