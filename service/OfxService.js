const ofx = require("ofx");
const { parseISO, format } = require("date-fns");


class OfxService {
    constructor() {

    }

    static processOfx(ofxData) {
        try {
            const base64Data = ofxData;
            let ofxString = Buffer.from(base64Data, "base64").toString("utf8");
            const invalidChars = /[&*()!@#$%\_]/g;
            ofxString = ofxString.replace(invalidChars, '');
            const parsedData = ofx?.parse(ofxString);
    
            console.log("--------------");
            console.log("Ofx processado");
            console.log("--------------");
    
            console.log("Começando transactions...")
            const transactions = parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
                (ofxTransaction) => {
                    return this.parseTransaction(ofxTransaction);
                }
            );
            console.log("Finalizando transactions...")

            return transactions;
        } catch (error) {
            console.log(error);
        }
       
    }

    static parseTransaction(ofxTransaction) {
        
        try {
            const dateString = ofxTransaction.DTPOSTED.slice(0,8);
            const date = parseISO(dateString);
            const formattedDate = format(date, "yyyy-MM-dd");

            return {
                data: formattedDate,
                valor: this.setPositiveValue(ofxTransaction.TRNAMT),
                observacao: ofxTransaction.MEMO,
                nmrMovimentacao: ofxTransaction.FITID,
                metodoPgto: ofxTransaction.TRNTYPE,
                tipo: this.setTypeTransaction(Number(ofxTransaction?.TRNAMT || 0))
            };
        } catch (error) {
            console.log("esta caindo aqui");
            console.error(error);
        }
    }

    static setTypeTransaction(value) {
        if(value < 0) {
            return 3;
        } else {
            return 2;
        }
    }

    static setPositiveValue(value) {
        return value < 0 ? Number(Math.abs(value)) : Number(value);
    }
    
}

module.exports = OfxService;