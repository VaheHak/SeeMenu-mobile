import _ from 'lodash';
import { CLIENT_CONTACT, CONTACT_CHANGE } from '../actions/contact';

const initialState = {
  formData: {},
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_CONTACT.REQUEST: {
      return {
        ...state,
        errors: {},
      };
    }
    case CLIENT_CONTACT.SUCCESS: {
      return {
        ...state,
        formData: {},
      };
    }
    case CLIENT_CONTACT.FAIL: {
      const { errors } = action.payload.data;
      return {
        ...state,
        errors,
      };
    }
    case CONTACT_CHANGE: {
      const {
        path,
        value,
      } = action.payload;
      const {
        formData,
      } = state;

      _.set(formData, path, value);

      return {
        ...state,
        formData: { ...formData },
      };
    }
    default: {
      return state;
    }
  }
}
