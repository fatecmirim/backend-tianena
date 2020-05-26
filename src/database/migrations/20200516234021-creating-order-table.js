
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: true
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: "events", key: "id" },
        allowNull: true
      },
      payed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
