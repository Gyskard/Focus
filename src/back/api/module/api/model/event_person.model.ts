/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, ForeignKey,
} from 'sequelize-typescript';

import Event from './event.model';
import Person from './person.model';

@Table({
  timestamps: false,
  freezeTableName: true,
})
export default class EventPerson extends Model {
  @ForeignKey(() => Event)
  @Column
    event_id: number;

  @ForeignKey(() => Person)
  @Column
    person_id: number;
}
