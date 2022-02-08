import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const CLIENT_CONTACT = define('CLIENT_CONTACT');

export function contactClient(formData) {
  return CLIENT_CONTACT.request(() => Api.sendContact(formData)).takeLatest();
}

export const CONTACT_CHANGE = 'CONTACT_CHANGE';

export function contactChange(path, value) {
  return {
    type: CONTACT_CHANGE,
    payload: {
      path,
      value,
    },
  };
}
