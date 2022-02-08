import axios from 'axios';
import Storage from './helpers/storage';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {},
});

api.interceptors.request.use((config) => {
  const c = config;
  const token = Storage.getToken();
  if (token) {
    c.headers.Authorization = token;
  }
  return c;
}, Promise.reject);

class Api {
  static getRestaurant(id, lang) {
    return api.get('/restaurants/for/client', {
      params: {
        id,
        lang,
      },
    });
  }

  static getMenu(lang, restaurantId, restaurantBranchId, categoryId, s, p, vegan, beginPrice, finishPrice) {
    return api.get('/menus', {
      params: {
        lang,
        restaurantId,
        restaurantBranchId,
        categoryId,
        s,
        p,
        vegan,
        beginPrice,
        finishPrice,
      },
    });
  }

  static getMenuItem(id, lang, restaurantId, restaurantBranchId, categoryId) {
    return api.get('/menus/single/menu', {
      params: {
        id,
        lang,
        restaurantId,
        restaurantBranchId,
        categoryId,
      },
    });
  }

  static sendContact(formData) {
    return api.post('/contact/send', formData);
  }

  static getOauthLogin(service, accessToken) {
    if (service === 'google') {
      return api.get('/oauth/google/user', {
        params: {
          accessToken,
        },
      });
    }
    return api.get('/oauth/facebook/user', {
      params: {
        accessToken,
      },
    });
  }

  static register(formData) {
    return api.post('/users/create/user', formData);
  }

  static login(formData) {
    return api.post('/users/login', formData);
  }

  static verification(formData) {
    return api.post('/users/user/confirm', formData);
  }

  static userProfile() {
    return api.get('/users');
  }

  static forgotPassword(formData) {
    return api.post('/users/reset/password', formData);
  }

  static usersUpdate(formData) {
    return api.put('/users/update', formData);
  }

  static createMenuOrder(formData) {
    return api.post('/order/item', formData);
  }
}

export default Api;
