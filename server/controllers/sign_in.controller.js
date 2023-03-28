/* eslint-disable no-throw-literal */
const { REQUEST_DATABASE } = require("../helpers/request")
const typesMessages = require("../util/typesMessages")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const EnvConstant = require("../util/EnvConstants");

const SignInController = async (req, res) => {
  try {
    const { EMAIL, PASS } = req.body.body;
    const { queryId } = req.body;

    if (!EMAIL) throw ({
      error: true,
      message: 'Campo Email esta vacio',
      status: 401
    })

    const result = await REQUEST_DATABASE({ body: { EMAIL, ID_USUARIO: 0 }, queryId });
    if (result.error === false) {
      const user = result.dataObject
      const passDecode = bcrypt.compareSync(PASS, user.PASSWORD)
      if (!passDecode) throw ({
        error: true,
        message: 'La contraseña es incorrecta',
        status: 401
      })
      
      const token = jwt.sign({ user }, EnvConstant.APP_TOKEN_AUTH, {
        expiresIn: 86400 * 7 // 24 horas * 7 dias
      })

      if (result.error) throw({ ...result });
      return res.status(201).json({...result, token, message: "Te has logueado con éxito"})
    }
  } catch (err) {
    return res.status(err.status || 500).json({...typesMessages.throwExcepctionServer(), ...err})
  }
}

module.exports = SignInController