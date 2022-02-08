import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import React from 'react';
import {
  CLOSE_MODAL,
  REGISTER,
  REGISTER_CHANGE,
} from '../actions/registration';

const initialState = {
  errors: {},
  formData: {},
  status: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER.FAIL: {
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

    case REGISTER_CHANGE: {
      const {
        path,
        value,
      } = action.payload;
      const {
        formData,
        errors,
      } = state;

      _.set(formData, path, value);

      delete errors[path];

      return {
        ...state,
        formData: { ...formData },
        errors: { ...errors },
      };
    }
    case REGISTER.SUCCESS: {
      return {
        ...state,
        formData: {},
        status: 'Your registration has been completely.',
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        status: '',
      };
    }

    default: {
      return state;
    }
  }
}
