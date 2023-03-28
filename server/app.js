const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes/index.route");
const bodyParser = require("body-parser")

// -- Config
app.set("port", process.env.PORT || 4000);

// -- Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// -- Routes
app.use("/api", router);

module.exports = app;
