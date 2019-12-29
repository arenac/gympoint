module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'help_orders', 
      'question', 
      {
        type: Sequelize.STRING(1000),
        allowNull: false,
      });
  },

  down: queryInterface => {
    return queryInterface.changeColumn(
      'help_orders', 
      'question', 
      {
        type: Sequelize.STRING,
        allowNull: false,
      });
  },
};
