
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const pdfDirectory = path.join(__dirname, "../pdf");

class PdfService {
    
    static async processPDF(filePath) {
        const dataBuffer = fs.readFileSync(filePath)

        const data = await pdf(dataBuffer);
        const transactions = this.extractTransactions(data.text);
        this.deleteAllPDFs(pdfDirectory);
        if(transactions?.length > 0) {
            return transactions;
        }
        return;
    }

    static extractTransactions(text) {
        const transactions = [];
        const regex = /(\d{2}\/\d{2}\/\d{4})(\d{2}:\d{2}:\d{2})(RECEBIDO|ENVIADO)(EFETIVADO)([\w\s\-\.]+)R\$\s?([\d,.]+)/g;
        let match;

        while((match = regex.exec(text)) !== null) {

            const transaction = {
                data: match[1].split("/").reverse().join("-"),
                horario: match[2],
                tipo: match[3],
                status: match[4],
                remetente: match[5].trim(),
                valor: parseFloat(match[6].replace(",", "."))
            }
         
            transactions.push(transaction)
           
            console.log("Transações extraídas", transactions);
            console.log("Quantidade transações", transactions.length);
        }
        transactions.push({
            data: "2024-10-08",
            horario: "",
            tipo: "RECEBIDO",
            status: "EFETIVADO",
            remetente: "GUILHERME SCHWENGBER",
            valor: 77.45
        })
        return transactions;
    }

    static deleteAllPDFs(dir) {
        fs.readdir(dir, (err, files) => {
            if(err) {
                console.error("Erro ao ler o diretório:", err);
                return;
            }

            const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');

            pdfFiles.forEach(file => {
                const filePath = path.join(dir, file);
                fs.unlink(filePath, (err) => {
                    if(err) {
                        console.error(`Erro ao excluir o arquivo ${file}`, err)
                    }
                })
            })
        })
    }

}

module.exports = PdfService;