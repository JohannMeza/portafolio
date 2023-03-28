import axios from 'axios';
import EnvConstants from '../util/EnvConstants';

export const axiosBase = axios.create({
  baseURL: EnvConstants.BASE_URL_LOCAL,
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem(EnvConstants.APP_TOKEN)}` }
}
)
export const axiosUpload = axios.create({
  baseURL: EnvConstants.BASE_URL_LOCAL,
  header: { 'Content-Type': 'application/x-www-form-urlencoded' },
  headers: { 'Authorization': `${localStorage.getItem(EnvConstants.APP_TOKEN)}` }
})