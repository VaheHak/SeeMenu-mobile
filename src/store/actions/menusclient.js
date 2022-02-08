import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const CLIENT_MENU = define('CLIENT_MENU');

export function menusClient(lang, restaurantId, restaurantBranchId, categoryId, s, p, vegan, beginPrice, finishPrice) {
  return CLIENT_MENU.request(() => Api.getMenu(lang, restaurantId, restaurantBranchId, categoryId, s, p, vegan, beginPrice, finishPrice))
    .onSuccess((p) => {
      p.categoryId = categoryId;
      return p;
    });
}

export const FILTER_CHANGE = 'FILTER_CHANGE';

export function filterClient(bool) {
  return {
    type: FILTER_CHANGE,
    payload: {
      bool,
    },
  };
}
