"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _qrcodegenerator = require('../utils/qrcode-generator'); var _qrcodegenerator2 = _interopRequireDefault(_qrcodegenerator);
var _nodeboleto = require('node-boleto');
var _Order = require('../models/Order'); var _Order2 = _interopRequireDefault(_Order);

class FinishOrderController {
  async finishOrder(req, res) {
    const amount = req.body.amount;
    const camaroteQuantityMen = req.body.camaroteQuantityMen;
    const camaroteQuantityWoman = req.body.camaroteQuantityWoman;
    const pistaQuantityMen = req.body.pistaQuantityMen;
    const pistaQuantityWoman = req.body.pistaQuantityWoman;
    const customerId = req.body.customerId;
    const eventId = req.body.eventId;
    const order = await _Order2.default.create({
      user_id: customerId, 
      event_id: eventId
    });
    console.log(order);
    
    const qrCodeGerado = await _qrcodegenerator2.default.call(void 0, { 
      customerId, 
      eventId, 
      amount,
      camaroteQuantityMen,
      camaroteQuantityWoman,
      pistaQuantityMen,
      pistaQuantityWoman
    });
    const boleto = new (0, _nodeboleto.Boleto)({
      'banco': "santander", // nome do banco dentro da pasta 'banks'
      'data_emissao': new Date(),
      'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
      'valor': amount * 100, // R$ 15,00 (valor em centavos)
      'nosso_numero': (Math.floor(Math.random() * 101) + 50000),
      'numero_documento': (Math.floor(Math.random() * 101) + 7000),
      'cedente': "Pagar.me Pagamentos S/A",
      'cedente_cnpj': `1872705${(Math.floor(Math.random() * 101) + 30)}`, // sem pontos e traços
      'agencia': "0005",
      'codigo_cedente': `1254865${(Math.floor(Math.random() * 101) + 30)}`, // PSK (código da carteira)
      'carteira': "985"
    });
    boleto.renderHTML(function (html) {
      console.log(html); //html gerado, só mandar como corpo do email
    });
    console.log(qrCodeGerado); //só mandar o qrCode pelo email
    return res.send();
  }
}
exports. default = new FinishOrderController();
