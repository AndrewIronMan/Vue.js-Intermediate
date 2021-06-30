const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setIsLogined(state, payload) {
    state.isLogined = payload;
  },
};

export default mutations;
