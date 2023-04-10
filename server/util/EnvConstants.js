const { config } = require("dotenv");
const { ValidarEntorno } = require("./UtilsComponents");
config();

const APP_DEVELOPMENT = ValidarEntorno(process.env.APP_ENV);

// Desarrollo
const APP_DEV_DB_HOST = process.env.APP_DEV_DB_HOST;
const APP_DEV_DB_DATABASE = process.env.APP_DEV_DB_DATABASE;
const APP_DEV_DB_USER = process.env.APP_DEV_DB_USER;
const APP_DEV_DB_PASS = process.env.APP_DEV_DB_PASS;
const APP_DEV_DB_PORT = process.env.APP_DEV_DB_PORT;
const APP_DEV_PORT = process.env.APP_DEV_PORT;
const APP_DEV_TOKEN_AUTH = process.env.APP_DEV_TOKEN_AUTH;

// Produccion
const APP_PROD_DB_HOST = process.env.APP_PROD_DB_HOST;
const APP_PROD_DB_DATABASE = process.env.APP_PROD_DB_DATABASE;
const APP_PROD_DB_USER = process.env.APP_PROD_DB_USER;
const APP_PROD_DB_PASS = process.env.APP_PROD_DB_PASS;
const APP_PROD_DB_PORT = process.env.APP_PROD_DB_PORT;
const APP_PROD_PORT = process.env.APP_PROD_PORT;
const APP_PROD_TOKEN_AUTH = process.env.APP_PROD_TOKEN_AUTH;

// Configuracion
const EnvConstant = {
    APP_DB_HOST               : APP_DEVELOPMENT  ?  APP_DEV_DB_HOST       :  APP_PROD_DB_HOST,
    APP_DB_DATABASE           : APP_DEVELOPMENT  ?  APP_DEV_DB_DATABASE   :  APP_PROD_DB_DATABASE,
    APP_DB_USER               : APP_DEVELOPMENT  ?  APP_DEV_DB_USER       :  APP_PROD_DB_USER,
    APP_DB_PASS               : APP_DEVELOPMENT  ?  APP_DEV_DB_PASS       :  APP_PROD_DB_PASS,
    APP_DB_PORT               : APP_DEVELOPMENT  ?  APP_DEV_DB_PORT       :  APP_PROD_DB_PORT,
    APP_PORT                  : APP_DEVELOPMENT  ?  APP_DEV_PORT          :  APP_PROD_PORT,
    APP_TOKEN_AUTH            : APP_DEVELOPMENT  ?  APP_DEV_TOKEN_AUTH    :  APP_PROD_TOKEN_AUTH,
    APP_CLOUDINARY_NAME       : process.env.APP_CLOUDINARY_NAME,
    APP_CLOUDINARY_KEY        : process.env.APP_CLOUDINARY_KEY,
    APP_CLOUDINARY_API_SECRET : process.env.APP_CLOUDINARY_API_SECRET,
    APP_PATH_UPLOAD           : '/upload',
}

module.exports = EnvConstant; 
