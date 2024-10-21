const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes.js");

const app = express();
const port = 3001;

app.use(cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

app.use(routes);


app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
})