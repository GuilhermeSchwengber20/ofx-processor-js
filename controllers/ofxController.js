const OfxModel = require("../models/ofxModel");
const OfxService = require("../service/OfxService");
class OfxController {
    static getProcessedOfx(req, res) {
        const ofxData = req.body.ofxData;
        if (!ofxData) {
            res.json({error: "Arquivo OFX não fornecido. Certifique-se de incluir o arquivo OFX no corpo da solicitação."});
            res.status(401);
        }
        const result = OfxService.processOfx(ofxData);

        if(result) {
            res.status(200);
            res.json({success: true, transactions: result});
            return;
        }

        res.status(400);
        res.json({error: "Algo inesperado aconteceu, por favor tente novamente"})

        // console.log("-----------------")
        // const base64Data = ofxData;
        // console.log("Recebeu ofxData")
        // console.log("-----------------")
        // const ofxString = Buffer.from(base64Data, "base64").toString("utf8");

        // const parsedData = ofx.parse(ofxString);
        // console.log("Ofx processado!")
        // console.log("-----------------")
        // const transactions = parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
        //     (ofxTransaction) => {
        //         return OfxModel.parseTransaction(ofxTransaction);
        //     }
        // );

        // console.log("Retornou transações")
        // return transactions;
    }
}

module.exports = OfxController;