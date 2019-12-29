const { subDays } =  require('date-fns');

/*
This file has been generated through:
yarn sequelize seed:generate --name admin-user

And the record has been created inside the db gympoint through:
yarn sequelize db:seed:all
*/
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrator',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: subDays(new Date(), 10),
          updated_at: subDays(new Date(), 10),
          is_admin: true,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
