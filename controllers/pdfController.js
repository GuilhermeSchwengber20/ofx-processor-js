const PdfService = require("../service/PdfService.js");

class PdfController {

    static async getProcessedPdf(req, res) {
        if(!req.file) return res.status(400).json({erro: "Nenhum arquivo foi enviado"});
        const filePath = req.file.path;
        try {
            const transactions = await PdfService.processPDF(filePath);
            res.json({transactions, success: true})
        } catch (error) {
            console.error("Erro ao processar o PDF", error);
            res.status(500).send('Eroo ao processar o PDF');
        }

    }
}

module.exports = PdfController;