const { config } = require("dotenv");
const EnvConstant = require("../util/EnvConstants");

config();

module.exports = {
  database: {
    host: EnvConstant.APP_DB_HOST,
    port: EnvConstant.APP_DB_PORT,
    user: EnvConstant.APP_DB_USER,
    password: EnvConstant.APP_DB_PASS,
    database: EnvConstant.APP_DB_DATABASE,
  },

  jwt: EnvConstant.APP_TOKEN_AUTH
}