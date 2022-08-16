import { Sequelize } from 'sequelize-typescript';
import config from 'config'

import * as dotenv from 'dotenv'
dotenv.config()

import Person from '../api/model/person.model';
import Event from '../api/model/event.model';
import File from '../api/model/file.model';
import Picture from '../api/model/picture.model';
import EventPerson from '../api/model/event_person.model';

type DbConfig = {
  dev: DbConfigMode,
  test: DbConfigMode,
  prod: DbConfigMode
} 

type DbConfigMode = {
  host: string,
  port: number
}

const dbConfig: DbConfig = config.get('dbConfig')
let dbConfigMode: DbConfigMode

switch(process.env.ENV) {
  case 'dev':
  case 'test':
  case 'prod':
    dbConfigMode = dbConfig[process.env.ENV]
    break
  default:
    dbConfigMode = dbConfig['dev']
}

const sequelize: Sequelize = new Sequelize('focus', 'admin', 'admin', {
  host: dbConfigMode.host,
  port: dbConfigMode.port,
  dialect: 'postgres',
  models: [Person, Event, File, Picture, EventPerson],
});

export default sequelize;
