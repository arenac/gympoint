const { subDays } =  require('date-fns');
 
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'checkins',
      [
        {
          student_id: 1,
          created_at: subDays(new Date(), 10),
          updated_at: subDays(new Date(), 10),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 9),
          updated_at: subDays(new Date(), 9),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 8),
          updated_at: subDays(new Date(), 8),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 7),
          updated_at: subDays(new Date(), 7),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 6),
          updated_at: subDays(new Date(), 6),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 3),
          updated_at: subDays(new Date(), 3),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 2),
          updated_at: subDays(new Date(), 2),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 1),
          updated_at: subDays(new Date(), 1),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('checkins', null, {});
  }
};
