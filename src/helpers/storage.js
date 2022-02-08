class Storage {
  static get() {
    try {
      return JSON.parse(localStorage.getItem('account')) || {};
    } catch (e) {
      return {};
    }
  }

  static set(account) {
    localStorage.setItem('account', JSON.stringify(account));
  }

  static getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return '';
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static roleGet() {
    if (localStorage.getItem('role')) {
      return localStorage.getItem('role');
    }
    return '';
  }

  static roleSet(role) {
    localStorage.setItem('role', role);
  }

  static delete() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }

  static getLang() {
    try {
      return JSON.parse(localStorage.getItem('lang')) || {};
    } catch (e) {
      return {};
    }
  }

  static setLang(lang) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }
}

export default Storage;
