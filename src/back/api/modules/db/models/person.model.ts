import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class Person extends Model {
  @Column
    first_name: string;

  @Column
    last_name: string;
}
