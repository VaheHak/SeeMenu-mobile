import _ from 'lodash';
import { USER, UPDATE_USERS, USER_CHANGE } from '../actions/userclient';

const initialState = {
  result: {},
  formData: {},
  errors: {},
  updateResult: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER.SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        result: data.result,
        formData: data.result,
        updateResult: [],
      };
    }

    case UPDATE_USERS.SUCCESS: {
      return {
        ...state,
        updateResult: action.payload.data,
        updateStatus: 'Users has been updated!',
      };
    }
    case UPDATE_USERS.FAIL: {
      return {
        ...state,
        errors: action.payload.data.errors,
      };
    }
    case USER_CHANGE: {
      const { path, value } = action.payload;
      const { formData, errors } = state;

      _.set(formData, path, value);

      delete errors.name;

      return {
        ...state,
        formData: { ...formData },
        errors: { ...errors },
      };
    }

    default: {
      return state;
    }
  }
}
