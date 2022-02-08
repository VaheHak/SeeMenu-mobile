import { OAUTH } from '../actions/user';
import storage from '../../helpers/storage';

const initialState = {
  result: {},
  errors: {},
  loading_login: false,
  token: storage.getToken(),
  role: storage.roleGet(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OAUTH.REQUEST: {
      return {
        ...state,
        loading_login: true,
      };
    }
    case OAUTH.SUCCESS: {
      const { data } = action.payload;
      storage.setToken(data.token);
      storage.roleSet(data.result.role);
      return {
        ...state,
        result: data.result,
        token: data.token,
        loading_login: false,
        role: data.result.role,
      };
    }
    case OAUTH.FAIL: {
      const { data: { errors } } = action.payload;
      return {
        ...state,
        errors,
        loading_login: false,
      };
    }

    default: {
      return state;
    }
  }
}
