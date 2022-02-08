import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const USER = define('USER');

export function chooseUser() {
  return USER.request(() => Api.userProfile()).takeLatest();
}

export const UPDATE_USERS = define('UPDATE_USERS');

export function updateUsersData(formData) {
  return UPDATE_USERS.request(() => Api.usersUpdate(formData))
    .takeLatest();
}

export const USER_CHANGE = 'USER_CHANGE';

export function usersChange(path, value) {
  return {
    type: USER_CHANGE,
    payload: {
      path,
      value,
    },
  };
}
