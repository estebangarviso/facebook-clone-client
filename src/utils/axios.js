// ref: https://axios-http.com/docs/config_defaults
import axios from 'axios';
import { BACKEND_URL } from '../app/config';

const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export default instance;

export async function handleSuccess(res) {
  const response = await res;
  console.log(`Response on handleSuccess`, response);
  return response;
}

export function handleError(err) {
  console.error(`Error on handleError`, err);
  return err.response;
}
