const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const ofxRoutes = require("./routes/ofxRoutes");

const app = express();
const port = 3000;

app.use(cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

app.use("/ofx", ofxRoutes);


app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
})