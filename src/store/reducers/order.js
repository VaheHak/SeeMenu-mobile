import _ from 'lodash';
import { CHANGE_COUNT, CREATE_MENU_ORDER } from '../actions/order';

const initialState = {
  orderData: [],
  formData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COUNT: {
      const {
        count,
        price,
        id,
        index,
      } = action.payload;

      const orderData = [...state.orderData];
      const data = {};

      if (index !== undefined) {
        data.index = index;
        data.id = id;
        data.count = count;
        data.price = price;

        if (orderData.find((d) => d.index === index && d.id === id)) {
          orderData.forEach((d, i) => {
            if (d.index === index && d.id === id) {
              orderData.splice(i, 1, data);
            }
          });

          return {
            ...state,
            orderData: [...orderData],
          };
        }
      } else {
        data.id = id;
        data.count = count;
        data.price = price;

        _.find(orderData, (el, ind) => {
          if (el.id === id) {
            orderData.splice(ind, 1);
          }
        });
      }

      orderData.push(data);

      return {
        ...state,
        orderData: [...orderData],
      };
    }
    // case CREATE_MENU_ORDER.SUCCESS: {
    //   return {
    //     ...state,
    //   };
    // }
    default: {
      return state;
    }
  }
}
