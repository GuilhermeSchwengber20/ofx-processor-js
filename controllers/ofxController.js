const OfxModel = require("../models/ofxModel");

const ofx = require("ofx");


class OfxController {
    static processOfx(ofxData) {
        if (!ofxData) {
            return {
                status: 400,
                error: "Arquivo OFX não fornecido. Certifique-se de incluir o arquivo OFX no corpo da solicitação.",
            };
        }
        console.log("-----------------")
        const base64Data = ofxData;
        console.log("Recebeu ofxData")
        console.log("-----------------")
        const ofxString = Buffer.from(base64Data, "base64").toString("utf8");

        const parsedData = ofx.parse(ofxString);
        console.log("Ofx processado!")
        console.log("-----------------")
        const transactions = parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
            (ofxTransaction) => {
                return OfxModel.parseTransaction(ofxTransaction);
            }
        );

        console.log("Retornou transações")
        return transactions;
    }
}

module.exports = OfxController;