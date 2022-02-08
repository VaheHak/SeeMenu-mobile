import _ from 'lodash';
import {
  LOGIN,
  LOGIN_CHANGE,
  USER_TOKEN_DELETE,
  FORGOT_PASSWORD,
  FORGOT_CHANGE,
} from '../actions/login';
import storage from '../../helpers/storage';

const initialState = {
  result: {},
  errors: {},
  formData: {},
  token: storage.getToken(),
  role: storage.roleGet(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN.REQUEST: {
      return {
        ...state,
      };
    }

    case LOGIN.SUCCESS: {
      const { data } = action.payload;
      storage.setToken(data.token);
      storage.roleSet(data.result.role);
      return {
        ...state,
        result: data.result,
        token: data.token,
        role: data.result.role,
        formData: {},
        errors: {},
      };
    }
    case LOGIN.FAIL: {
      const { data } = action.payload;
      if (data.errors) {
        return {
          ...state,
          errors: data.errors,
        };
      }
      return {
        ...state,
        errors: data,
      };
    }

    case USER_TOKEN_DELETE: {
      storage.delete();

      return {
        ...state,
        token: '',
        result: {},
      };
    }

    case LOGIN_CHANGE: {
      const {
        path,
        value,
      } = action.payload;
      const { formData } = state;

      _.set(formData, path, value);

      return {
        ...state,
        formData: { ...formData },
      };
    }

    case FORGOT_CHANGE: {
      const {
        path,
        value,
      } = action.payload;

      const { formData } = state;

      _.set(formData, path, value);

      return {
        ...state,
        formData: { ...formData },
        errors: {},
      };
    }

    case FORGOT_PASSWORD.REQUEST: {
      return {
        ...state,
      };
    }
    case FORGOT_PASSWORD.SUCCESS: {
      return {
        ...state,
        formData: {},
      };
    }
    case FORGOT_PASSWORD.FAIL: {
      const { data } = action.payload;
      if (data.errors) {
        return {
          ...state,
          errors: data.errors,
        };
      }
      return {
        ...state,
        errors: data,
      };
    }

    default: {
      return state;
    }
  }
}
