/* eslint-disable no-throw-literal */
const { REQUEST_DATABASE } = require("../helpers/request")
const typesMessages = require("../util/typesMessages")

const OptionsController = async (req, res) => {
  try {
    const result = await REQUEST_DATABASE(req.body);
    if (result.error) throw({ ...result });
    return res.status(201).json(result)
  } catch (err) {
    return res.status(err.status || 500).json({...typesMessages.throwExcepctionServer(), ...err})
  }
}

module.exports = OptionsController