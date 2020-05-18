"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _qrcodegenerator = require('../utils/qrcode-generator'); var _qrcodegenerator2 = _interopRequireDefault(_qrcodegenerator);

class FinishOrderController {
  async finishOrder(req, res) {
    const amount = req.body.amount;
    const camaroteQuantityMen = req.body.camaroteQuantityMen;
    const camaroteQuantityWoman = req.body.camaroteQuantityWoman;
    const pistaQuantityMen = req.body.pistaQuantityMen;
    const pistaQuantityWoman = req.body.pistaQuantityWoman;
    const customerId = req.body.customerId;
    const eventId = req.body.eventId;

    const response = await _qrcodegenerator2.default.call(void 0, {customerId, eventId, amount});
    console.log(response);
    return res.send();    
  }
}
exports. default = new FinishOrderController();
