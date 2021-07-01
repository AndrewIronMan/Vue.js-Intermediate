import getData from '../../../helpers/getData';

const actions = {
  async getPosts({ commit }) {
    commit('setPosts', await getData(`${process.env.VUE_APP_API_BASE_URL}/posts`));
  },
};

export default actions;
