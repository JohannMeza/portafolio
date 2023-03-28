const multer = require('multer');
const {StorageMulterCloudinary, StorageMulterTemp} = require('./StorageMulter.js');

const cloudinary = multer({ storage: StorageMulterCloudinary, limits: {fieldSize: 25 * 1024 * 1024} })
const StorageTemp = multer({ storage: StorageMulterTemp, limits: {fieldSize: 25 * 1024 * 1024} })

module.exports = {
  cloudinary,
  StorageTemp
}