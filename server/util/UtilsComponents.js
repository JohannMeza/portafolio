const multer = require('multer');
const {StorageMulterCloudinary, StorageMulterTemp} = require('./StorageMulter.js');

const cloudinary = multer({ storage: StorageMulterCloudinary, limits: {fieldSize: 25 * 1024 * 1024} })
const StorageTemp = multer({ storage: StorageMulterTemp, limits: {fieldSize: 25 * 1024 * 1024} })
const ValidarEntorno = (env) => {
  if (env === 'Desarrollo') return true
  else if (env === 'Produccion') return false
}

module.exports = {
  cloudinary,
  StorageTemp,
  ValidarEntorno
}