import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const CLIENT_MENU_ITEM = define('CLIENT_MENU_ITEM');

export function menusItem(id, lang, restaurantId, restaurantBranchId, categoryId) {
  return CLIENT_MENU_ITEM.request(() => Api.getMenuItem(id, lang, restaurantId, restaurantBranchId, categoryId)).takeLatest();
}
