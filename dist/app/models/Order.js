"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Order extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: _sequelize2.default.INTEGER,
        transaction_id: _sequelize2.default.INTEGER,
        user_id: _sequelize2.default.INTEGER,
        event_id: _sequelize2.default.INTEGER
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
exports. default = Order;
