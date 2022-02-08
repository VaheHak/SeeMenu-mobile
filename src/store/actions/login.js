import { define } from '../../helpers/redux-request';
import Api from '../../Api';

export const LOGIN = define('LOGIN');

export function loginUser(formData) {
  return LOGIN.request(() => Api.login(formData))
    .takeLatest();
}

export const USER_TOKEN_DELETE = 'USER_TOKEN_DELETE';

export function deleteToken() {
  return {
    type: USER_TOKEN_DELETE,
    payload: {},
  };
}

export const LOGIN_CHANGE = 'LOGIN_CHANGE';

export function loginChange(path, value) {
  return {
    type: LOGIN_CHANGE,
    payload: {
      path,
      value,
    },
  };
}

export const USER_ACTIVATE = define('USER_ACTIVATE');

export function userActivateRequest(formData) {
  return USER_ACTIVATE.request(() => Api.verification(formData))
    .takeLatest();
}

export const FORGOT_PASSWORD = define('FORGOT_PASSWORD');

export function userForgotPassword(formData) {
  return FORGOT_PASSWORD.request(() => Api.forgotPassword(formData))
    .takeLatest();
}

export const FORGOT_CHANGE = 'FORGOT_CHANGE';

export function forgotChange(path, value) {
  return {
    type: FORGOT_CHANGE,
    payload: {
      path,
      value,
    },
  };
}
