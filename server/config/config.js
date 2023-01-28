const { config } = require("dotenv");
config();

module.exports = {
  database: {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
  },

  jwt: process.env.TOKEN_AUTH
}