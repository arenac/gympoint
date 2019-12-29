const { subDays } =  require('date-fns');
 
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'Do I need to buy any suplement?',
          answer: 'Not right now. We can talk about that in a month.',
          answer_at: subDays(new Date(), 4),
          created_at: subDays(new Date(), 5),
          updated_at: subDays(new Date(), 4),
        },
        {
          student_id: 1,
          question: 'Should I increase the biceps curl weight?',
          answer: null,
          answer_at: null,
          created_at: subDays(new Date(), 3),
          updated_at: subDays(new Date(), 3),
        },
        {
          student_id: 2,
          question: 'How are you?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          question: 'How are you?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('help_orders', null, {});
  }
};
