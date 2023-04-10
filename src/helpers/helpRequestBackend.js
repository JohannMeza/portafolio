import { SERVICES_POST, UPLOAD_POST } from "../services/services.axios";
import { AlertUtilMessage } from "../util/AlertUtil";
import EnvConstants from "../util/EnvConstants";
import { UploadFile } from "../util/UploadFile";

/**
 * 
 * @param {object} config 
 * @returns Realiza peticion validando si el token es valido
 */

export const SaveRequestData = (config) => {
  let { queryId, body = {}, success, error, pagination, rowsPerPage, page } = config;

  if (pagination) {
    let params = {queryId, body: { ...body, rowsPerPage, page, }}
    return SERVICES_POST(EnvConstants.APP_URL_BASE, params) 
    .then(resp => {
      success(resp.data)
    })
    .catch((err) => {
      let { response } = err;
      let { status, message } = response.data
      error(response.data)
      AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
    })
  } else {
    let params = {queryId, body}
    return SERVICES_POST(EnvConstants.APP_URL_BASE, params)
    .then(resp => success({...resp.data}))
    .catch(err => {
      let { response } = err;
      let { status, message } = response.data
      if (status >= 500) AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
      error(response.data)
    })
  }
}

/**
 * 
 * @param {object} config 
 * @returns Realiza peticion sin validar el token o enviar una path en el config
 */

export const SendRequestData = (config) => { 
  let { queryId, body = {}, success, error, pagination, rowsPerPage, page, path } = config;
  if (!path) path = EnvConstants.APP_URL_BASE_FRONT;
  if (pagination) {
    let params = {queryId, body: { ...body, rowsPerPage, page, }}
    return SERVICES_POST(path, params) 
    .then(resp => {
      success(resp.data)
    })
    .catch((err) => {
      let { response } = err;
      let { status, message } = response.data
      error(response.data)
      AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
    })
  } else {
    let params = {queryId, body}
    return SERVICES_POST(path, params)
    .then(resp => success({...resp.data}))
    .catch(err => {
      let { response } = err;
      let { status, message } = response.data
      if (status >= 500) AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
      error(response.data)
    })
  } 
}

/**
 * 
 * @param {object} config 
 * @returns Realiza una peticion y guarda un archivo en cloudinary
 */

export const FileRequestData = (config) => {
  let { queryId, body, success, error, pagination, rowsPerPage, page } = config;

  if (pagination) {
    let params = UploadFile({queryId, body: { ...body, rowsPerPage, page, }})
    return UPLOAD_POST(EnvConstants.APP_URL_UPLOAD, params) 
    .then(resp => {
      success(resp.data)
    })
    .catch((err) => {
      let { response } = err;
      let { status, message } = response.data
      error(response.data)
      AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
    })
  } else {
    let params = UploadFile({queryId, ...body})
    return UPLOAD_POST(EnvConstants.APP_URL_UPLOAD, params)
    .then(resp => success({...resp.data}))
    .catch(err => {
      let { response } = err;
      let { status, message } = response.data
      if (status >= 500) AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
      error(response.data)
    })
  }
}

/**
 * 
 * @param {object} config 
 * @returns Login
 */

export const SignInRequestData = (config) => {
  let { queryId, body = {}, success, error, pagination, rowsPerPage, page } = config;

  if (pagination) {
    let params = {queryId, body: { ...body, rowsPerPage, page, }}
    return SERVICES_POST(EnvConstants.APP_URL_SIGN_IN, params) 
    .then(resp => {
      success(resp.data)
    })
    .catch((err) => {
      let { response } = err;
      let { status, message } = response.data
      error(response.data)
      AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
    })
  } else {
    let params = {queryId, body}
    return SERVICES_POST(EnvConstants.APP_URL_SIGN_IN, params)
    .then(resp => success({...resp.data}))
    .catch(err => {
      let { response } = err;
      let { status, message } = response.data
      if (status >= 500) AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
      error(response.data)
    })
  }
}

/**
 * 
 * @param {object} config 
 * @returns Register
 */

export const SignUpRequestData = (config) => {
  let { queryId, body = {}, success, error, pagination, rowsPerPage, page } = config;

  if (pagination) {
    let params = {queryId, body: { ...body, rowsPerPage, page, }}
    return SERVICES_POST(EnvConstants.APP_URL_SIGN_UP, params) 
    .then(resp => {
      success(resp.data)
    })
    .catch((err) => {
      let { response } = err;
      let { status, message } = response.data
      error(response.data)
      AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
    })
  } else {
    let params = {queryId, body}
    return SERVICES_POST(EnvConstants.APP_URL_SIGN_UP, params)
    .then(resp => success({...resp.data}))
    .catch(err => {
      let { response } = err;
      let { status, message } = response.data
      if (status >= 500) AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
      error(response.data)
    })
  }
}