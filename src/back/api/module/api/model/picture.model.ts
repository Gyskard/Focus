/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, AllowNull, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import Event from './event.model';

@Table({
  timestamps: false,
  freezeTableName: true,
})
export default class Picture extends Model {
  @AllowNull(false)
  @Column
    storage_id: string;

  @ForeignKey(() => Event)
  @Column
    event_id: number;

  @BelongsTo(() => Event)
    event: Event;
}
