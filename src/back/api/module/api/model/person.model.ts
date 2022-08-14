/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, AllowNull, BelongsToMany,
} from 'sequelize-typescript';

import Event from './event.model';
import EventPerson from './event_person.model';

@Table({
  timestamps: false,
  freezeTableName: true,
})
export default class Person extends Model {
  @AllowNull(false)
  @Column
    first_name: string;

  @AllowNull(false)
  @Column
    last_name: string;

  @BelongsToMany(() => Event, () => EventPerson)
    events: Event[];
}
