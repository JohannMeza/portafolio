const router = require("express").Router();
const OptionsController = require("../controllers/options.controller.js")

router.post("/options", OptionsController)

module.exports = router 