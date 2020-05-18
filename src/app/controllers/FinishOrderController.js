import generateQR from "../utils/qrcode-generator";

class FinishOrderController {
  async finishOrder(req, res) {
    const amount = req.body.amount;
    const camaroteQuantityMen = req.body.camaroteQuantityMen;
    const camaroteQuantityWoman = req.body.camaroteQuantityWoman;
    const pistaQuantityMen = req.body.pistaQuantityMen;
    const pistaQuantityWoman = req.body.pistaQuantityWoman;
    const customerId = req.body.customerId;
    const eventId = req.body.eventId;

    const response = await generateQR({customerId, eventId, amount});
    console.log(response);
    return res.send();    
  }
}
export default new FinishOrderController();
