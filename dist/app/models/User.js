"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
        type: _sequelize2.default.STRING,
        cpf: _sequelize2.default.STRING
      },
      {
        sequelize
      }
    );
    // ANTES DE GRAVA NO BANCO IRÀ EXECUTAR ESTE TRECHO //
    this.addHook("beforeSave", async user => {
      if (user.password) {
        // CRIPTOGRAFA A SENHA //
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    // RETORNA O MODEL QUE FOI INICIALIZADO //
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Event, { foreignKey: "id_events" });
  }
  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}
exports. default = User;
