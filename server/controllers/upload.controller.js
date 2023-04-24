/* eslint-disable no-throw-literal */
const { REQUEST_DATABASE } = require("../helpers/request")
const typesMessages = require("../util/typesMessages")
const cloudinary = require("cloudinary");
const EnvConstant = require("../util/EnvConstants");

const UploadController = async (req, res) => {
  try {
    cloudinary.config({ cloud_name: EnvConstant.APP_CLOUDINARY_NAME, api_key: EnvConstant.APP_CLOUDINARY_KEY, api_secret: EnvConstant.APP_CLOUDINARY_API_SECRET })
    const fileUpload = await cloudinary.uploader.upload(req.file.path)
    const body = { ...req.body, PORTADA: fileUpload.url, ID_CATEGORIAS: JSON.parse(req.body.ID_CATEGORIAS), ID_ETIQUETAS: JSON.parse(req.body.ID_ETIQUETAS) }
    const result = await REQUEST_DATABASE({ queryId: req.body.queryId, body });
    if (result.error) throw({ ...result });
    return res.status(201).json(result)
  } catch (err) {
    return res.status(err.status || 500).json({...typesMessages.throwExcepctionServer(), ...err})
  }
}

const UserUploadController = async (req, res) => {
  try {
    cloudinary.config({ cloud_name: EnvConstant.APP_CLOUDINARY_NAME, api_key: EnvConstant.APP_CLOUDINARY_KEY, api_secret: EnvConstant.APP_CLOUDINARY_API_SECRET })
    const fileUpload = await cloudinary.uploader.upload(req.file.path)
    const body = { ...req.body, IMAGEN: fileUpload.url }
    const result = await REQUEST_DATABASE({ queryId: req.body.queryId, body });
    if (result.error) throw({ ...result });
    return res.status(201).json(result)
  } catch (err) {
    return res.status(err.status || 500).json({...typesMessages.throwExcepctionServer(), ...err})
  }
}

module.exports = {
  UploadController,
  UserUploadController
}