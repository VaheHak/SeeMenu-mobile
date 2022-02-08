import _ from 'lodash';
import { CLIENT_MENU, FILTER_CHANGE } from '../actions/menusclient';

const initialState = {
  data: {},
  max: 0,
  min: 0,
  filter: false,
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_MENU.SUCCESS: {
      const { data, categoryId } = action.payload;
      let { max } = state;

      _.map(data.result, (el) => {
        if (el.price > max) {
          max = el.price;
        }
      });

      return {
        ...state,
        data: {
          ...state.data,
          [categoryId]: data.result,
        },
        max,
      };
    }
    case CLIENT_MENU.FAIL: {
      const { data } = action.payload;
      return {
        ...state,
        errors: data,
      };
    }

    case FILTER_CHANGE: {
      const { bool } = action.payload;
      return {
        ...state,
        filter: bool,
      };
    }

    default: {
      return state;
    }
  }
}
