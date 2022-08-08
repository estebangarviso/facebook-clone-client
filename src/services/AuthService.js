import axios, { handleError, handleSuccess } from '../utils/axios';

const relativePath = '/users';

async function login(formData) {
  try {
    const res = await axios.post(relativePath + '/login', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function register(formData) {
  try {
    const res = await axios.post(relativePath + '/register', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function logout() {
  try {
    const res = await axios.post(relativePath + '/logout', null, { headers: { cookie: document.cookie } });
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function refresh() {
  try {
    const res = await axios.post(relativePath + '/refresh');
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

const AuthService = {
  login,
  register,
  logout,
  refresh
};

export default AuthService;
