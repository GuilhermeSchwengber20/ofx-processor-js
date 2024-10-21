const express = require("express");
const path = require("path");
const multer = require("multer");
const PdfController = require("../controllers/pdfController.js");
const OfxController = require("../controllers/ofxController.js");


const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'pdf/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/process-ofx", OfxController.getProcessedOfx);

router.post("/process-pdf", upload.single('pdf'), PdfController.getProcessedPdf);


module.exports = router;