import store from '../store/modules/index';

export default {
  check() {
    if (window.localStorage.getItem('token')) {
      store.commit('auth/setIsLogined', true);
      return true;
    }
    return false;
  },
};
