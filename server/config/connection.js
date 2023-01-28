const { user, host, database, password, port }  = require("./config.js").database;
const { Client } = require("pg");
const conection = new Client({user, host, database, password, port});
module.exports = conection
