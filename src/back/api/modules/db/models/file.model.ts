/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, AllowNull, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import Event from './event.model';

@Table
export default class File extends Model {
  @AllowNull(false)
  @Column
    storage_id: string;

  @AllowNull(false)
  @Column
    name: string;

  @ForeignKey(() => Event)
  @Column
    eventId: number;

  @BelongsTo(() => Event)
    event: Event;
}
