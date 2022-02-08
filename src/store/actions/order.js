import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const CHANGE_COUNT = 'CHANGE_COUNT';

export function changeCount(count, price, id, index) {
  return {
    type: CHANGE_COUNT,
    payload: {
      count,
      price,
      id,
      index,
    },
  };
}

export const CREATE_MENU_ORDER = define('CREATE_MENU_ORDER');

export function createMenuOrder(formData) {
  return CREATE_MENU_ORDER.request(() => Api.createMenuOrder(formData))
    .takeLatest();
}
