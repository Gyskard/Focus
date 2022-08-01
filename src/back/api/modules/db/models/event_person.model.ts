/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, ForeignKey,
} from 'sequelize-typescript';

import Event from './event.model';
import Person from './person.model';

@Table
export default class EventPerson extends Model {
  @ForeignKey(() => Event)
  @Column
    eventId: number;

  @ForeignKey(() => Person)
  @Column
    personId: number;
}
