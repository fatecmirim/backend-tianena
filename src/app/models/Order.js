import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        transaction_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        event_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Event, { foreignKey: "user_id" });
    this.belongsTo(models.Event, { foreignKey: "event_id" });
  }
 
}
export default Order;
