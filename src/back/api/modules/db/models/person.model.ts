/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, AllowNull, ForeignKey, BelongsToMany,
} from 'sequelize-typescript';

import Event from './event.model';
import EventPerson from './event_person.model';

@Table
export default class Person extends Model {
  @AllowNull(false)
  @Column
    first_name: string;

  @AllowNull(false)
  @Column
    last_name: string;

  @ForeignKey(() => Event)
  @Column
    eventId: number;

  @BelongsToMany(() => Event, () => EventPerson)
    events: Event[];
}
