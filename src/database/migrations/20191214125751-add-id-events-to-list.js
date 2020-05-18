module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("list", "id_events", {
      type: Sequelize.INTEGER,
      references: { model: "events", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn("list", "id_events");
  }
};
