import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize('focus', 'admin', 'admin', {
  host: process.env.ENV === 'prod' ? 'db' : 'localhost',
  port: process.env.ENV === 'prod' ? 5432 : 4002,
  dialect: 'postgres',
});

export default sequelize;
