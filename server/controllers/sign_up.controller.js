/* eslint-disable no-throw-literal */
const { REQUEST_DATABASE } = require("../helpers/request");
const typesMessages = require("../util/typesMessages")
const bcrypt = require("bcrypt")

const SignUpController = async (req, res) => {
  try {
    const { body, queryId } = req.body;
    const { PASSWORD } = body;
    let passEncode;
    if (PASSWORD) {
      const salt = await bcrypt.genSalt(10);
      passEncode = bcrypt.hashSync(PASSWORD, salt)
    }
    const result = await REQUEST_DATABASE({ body: { ...body, PASSWORD: passEncode }, queryId: queryId || 8 });
    if (result.error) throw({ ...result });
    
    return res.status(201).json(result)
  } catch (err) {
    return res.status(err.status || 500).json({...typesMessages.throwExcepctionServer(), ...err})
  }
}

module.exports = SignUpController;