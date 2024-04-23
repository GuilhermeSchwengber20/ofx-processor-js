const express = require("express");

const OfxController = require("../controllers/ofxController");

const router = express.Router();


router.post("/process-ofx", (req, res) => {
    console.log("bateu na rota /process-ofx")
    const ofxData = req.body.ofxData;
    
    const transactions = OfxController.processOfx(ofxData);

    res.json({success: true, transactions});
})

module.exports = router;