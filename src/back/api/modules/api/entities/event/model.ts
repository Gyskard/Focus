/* eslint-disable import/no-cycle */

import {
  Table, Column, Model, DataType, AllowNull, HasMany,
} from 'sequelize-typescript';

import Picture from '../picture/model';
import File from '../file/model';
import Person from '../person/model';

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

  @HasMany(() => Picture)
    pictures: Picture[];

  @HasMany(() => File)
    files: File[];

  @HasMany(() => Person)
    persons: Person[];
}
