import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const CLIENT_RESTAURANT = define('CLIENT_RESTAURANT');

export function clientRestaurant(id, lang) {
  return CLIENT_RESTAURANT.request(() => Api.getRestaurant(id, lang), { id })
    .takeLatest();
}
