import { SERVICES_POST } from "../services/services.axios";
import { AlertUtilMessage } from "../util/AlertUtil";
import EnvConstants from "../util/EnvConstants";

export const SaveRequestData = (config) => {
  let { queryId, body = {}, success, error, pagination, rowsPerPage, page } = config;

  if (pagination) {
    let params = {queryId, body: { ...body, rowsPerPage, page, }}
    return SERVICES_POST(EnvConstants.REQUEST_SERVER_OPTIONS, params) 
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
    return SERVICES_POST(EnvConstants.REQUEST_SERVER_OPTIONS, params)
    .then(resp => success({...resp.data}))
    .catch(err => {
      let { response } = err;
      let { status, message } = response.data
      if (status >= 500) AlertUtilMessage({ title: `Error ${status}`, text: message, type: "error" })
      error(response.data)
    })
  }
}