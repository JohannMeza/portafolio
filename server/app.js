const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const router = require("./routes/index.route");

// -- Config
app.set("port", process.env.PORT || 4000);

// -- Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// -- Routes
app.use("/api", router)

module.exports = app