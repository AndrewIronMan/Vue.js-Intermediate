import postData from '../../../helpers/postData';

const actions = {
  async registration({ commit }, payload) {
    const { user, success } = await postData(
      `${process.env.VUE_APP_API_BASE_URL_AUTH}/auth`,
      payload,
    );
    if (!success) {
      return false;
    }
    commit('setUser', user);
    commit('setIsLogined', success);
    return success;
  },
  logout({ commit }) {
    commit('setUser', {});
    commit('setIsLogined', false);
  },
};

export default actions;
