import axios from 'axios';
import EnvConstants from '../util/EnvConstants';

export const axiosBase = axios.create({
  baseURL: EnvConstants.BASE_URL_LOCAL,
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}` }
})