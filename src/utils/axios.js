// ref: https://axios-http.com/docs/config_defaults
import axios from 'axios';
import { BACKEND_URL } from '../app/config';

axios.defaults.baseURL = BACKEND_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('axios.interceptors.request token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

export async function handleSuccess(res) {
  const response = await res;
  console.log(`Response on handleSuccess`, response);
  return response;
}

export function handleError(err) {
  console.error(`Error on handleError`, err);
  return err.response;
}
