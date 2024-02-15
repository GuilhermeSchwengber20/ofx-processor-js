const { parseISO, format } = require("date-fns");

class OfxModel {
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

    static parseTransaction(ofxTransaction) {
        
        const dateString = ofxTransaction.DTPOSTED.slice(0,8);
        const date = parseISO(dateString);
        const formattedDate = format(date, "yyyy-MM-dd");

        return {
            data: formattedDate,
            valor: this.setPositiveValue(ofxTransaction.TRNAMT),
            observacao: ofxTransaction.MEMO,
            nmrMovimentacao: ofxTransaction.FITID,
            metodoPgto: ofxTransaction.TRNTYPE,
            tipo: this.setTypeTransaction(ofxTransaction.TRNAMT)
            
        };
    }
}

module.exports = OfxModel;