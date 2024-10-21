const OfxService = require("../service/OfxService.js");

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
    }
}

module.exports = OfxController;