const jwt = require('jsonwebtoken');
const EnvConstant = require('../util/EnvConstants');

const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, EnvConstant.APP_TOKEN_AUTH)
    req.body = {...req.body, ...decoded.user};
    next();
  } catch (err) {
    return res.status(err.status || 500).json({ ...err, status: 500 })
  }
}

module.exports = auth