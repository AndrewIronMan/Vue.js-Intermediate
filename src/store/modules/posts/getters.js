import paginate from '../../../helpers/paginate';

const getters = {
  getPosts: (state) => (query) => {
    if (query?.userId) {
      return paginate(
        state.posts.filter((post) => post.userId === query?.userId),
        query?.nextPage,
        query?.perPage,
      );
    }
    return paginate(state.posts, query?.nextPage, query?.perPage);
  },
  getPostById: (state) => (id) => state.posts.find((post) => post.id === id),
};

export default getters;
