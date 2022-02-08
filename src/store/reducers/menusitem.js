import { CLIENT_MENU_ITEM } from '../actions/menusitem';

const initialState = {
  menu: {},
  err: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_MENU_ITEM.SUCCESS: {
      const { data: { result } } = action.payload;
      return {
        ...state,
        menu: result,
      };
    }

    case CLIENT_MENU_ITEM.FAIL: {
      const { data } = action.payload;
      return {
        ...state,
        err: data,
      };
    }

    default: {
      return state;
    }
  }
}
