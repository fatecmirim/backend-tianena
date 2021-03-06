import generateQR from "../utils/qrcode-generator";
import { Boleto } from 'node-boleto';
import Order from "../models/Order";

class FinishOrderController {
  async finishOrder(req, res) {
    const amount = req.body.amount;
    const camaroteQuantityMen = req.body.camaroteQuantityMen;
    const camaroteQuantityWoman = req.body.camaroteQuantityWoman;
    const pistaQuantityMen = req.body.pistaQuantityMen;
    const pistaQuantityWoman = req.body.pistaQuantityWoman;
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const order = await Order.create({
      payed: false,
      user_id: userId,
      event_id: eventId
    });

    //é gerado uma imagem base 64, tem que ver como colocar isso no corpo do email
    //acredito de só mandar já vai ir certo
    const qrCodeGerado = await generateQR({
      customerId,
      eventId,
      amount,
      camaroteQuantityMen,
      camaroteQuantityWoman,
      pistaQuantityMen,
      pistaQuantityWoman
    });

    const boleto = new Boleto({
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
export default new FinishOrderController();
