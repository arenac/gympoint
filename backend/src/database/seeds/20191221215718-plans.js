/*
This seed didn't run.
Data inserted through the first seed
*/
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Start',
          duration: 1,
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          duration: 3,
          price: 109,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamont',
          duration: 6,
          price: 89,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('plans', null, {});
  }
};
