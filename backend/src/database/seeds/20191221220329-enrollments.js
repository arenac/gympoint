const { subDays, addMonths } =  require('date-fns');

const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'enrollments',
      [
        {
          student_id: 1,
          plan_id: 2,
          start_date: subDays(new Date(), 10),
          end_date: subDays(addMonths(new Date(), 3), 10),
          price: 327,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          plan_id: 3,
          start_date: new Date(),
          end_date: addMonths(new Date(), 6),
          price: 534,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          plan_id: 1,
          start_date: new Date(),
          end_date: addMonths(new Date(), 1),
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('enrollments', null, {});
  }
};
