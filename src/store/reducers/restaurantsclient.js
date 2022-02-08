import { CLIENT_RESTAURANT } from '../actions/restaurantsclient';

const initialState = {
  data: {},
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_RESTAURANT.SUCCESS: {
      const {
        data: { result },
      } = action.payload;

      return {
        ...state,
        data: result,
      };
    }
    case CLIENT_RESTAURANT.FAIL: {
      const { data } = action.payload;
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
