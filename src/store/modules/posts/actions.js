import getData from '../../../helpers/getData';

const actions = {
  async getPosts({ commit }, query) {
    const posts = query && (query?.nextPage || query?.perPage)
      ? await getData(
        `${process.env.VUE_APP_API_BASE_URL}/posts?currentPage=${query?.nextPage}&perPage=${query?.perPage}`,
      )
      : await getData(`${process.env.VUE_APP_API_BASE_URL}/posts`);
    commit('setPosts', posts);
  },
};

export default actions;
