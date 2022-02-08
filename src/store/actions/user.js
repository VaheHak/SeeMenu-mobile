import Api from '../../Api';
import { define } from '../../helpers/redux-request';

export const OAUTH = define('OAUTH');
export function oAuthRequest(service, accessToken) {
  return OAUTH.request(() => Api.getOauthLogin(service, accessToken)).takeLatest();
}
