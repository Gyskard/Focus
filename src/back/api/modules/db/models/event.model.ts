import {
  Table, Column, Model, DataType, AllowNull,
} from 'sequelize-typescript';

@Table
export default class Event extends Model {
  @AllowNull(false)
  @Column
    title: string;

  @Column
    description: string;

  @AllowNull(false)
  @Column
    localisation: string;

  @AllowNull(false)
  @Column(DataType.DATE)
    date: string;
}
