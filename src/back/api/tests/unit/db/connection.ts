import assert from 'assert';

import sequelize from '../../../modules/db/connection';

describe('Database connection', () => {
  it('should return true when it is connected to the database', async () => {
    let isConnected: boolean = false;
    try {
      await sequelize.authenticate();
      isConnected = true;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
    assert.equal(isConnected, true);
  });
});
