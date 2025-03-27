import axios from 'axios';
import { getHostAPIUrl } from '../appConfig.js';
import getUserToken from './utils/getUserToken';

const appAxios = axios.create({
  baseURL: getHostAPIUrl(),
  timeout: 30000,
  responseType: 'json',
});

appAxios.interceptors.request.use(async (config) => {
  if (getUserToken() && !(window.location.pathname === '/login')) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    config.headers = {
      Authorization: `Token ${getUserToken()}`,
    };
  }
  return config;
});

export default appAxios;
