const { subDays } =  require('date-fns');

const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Max',
          email: 'max@email.com',
          age: 17,
          weight: 75.5,
          height: 1.7,
          created_at: subDays(new Date(), 10),
          updated_at: subDays(new Date(), 10),
        },
        {
          name: 'Thiago',
          email: 'thiago@email.com',
          age: 26,
          weight: 80,
          height: 1.8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Leticia',
          email: 'leticia@email.com',
          age: 30,
          weight: 69,
          height: 1.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('students', null, {});
  },
};

