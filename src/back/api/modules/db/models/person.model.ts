import {
  Table, Column, Model, AllowNull,
} from 'sequelize-typescript';

@Table
export default class Person extends Model {
  @AllowNull(false)
  @Column
    first_name: string;

  @AllowNull(false)
  @Column
    last_name: string;
}
