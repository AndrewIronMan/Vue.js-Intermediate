import paginate from '../../../helpers/paginate';
import postFilterById from '../../../helpers/postFilterById';

const getters = {
  getPosts: (state) => (query) => {
    if (query?.userId) {
      return paginate(postFilterById(state.posts, query?.userId), query?.nextPage, query?.perPage);
    }
    return paginate(state.posts, query?.nextPage, query?.perPage);
  },
  getPostById: (state) => (id) => state.posts.find((post) => post.id === id),
};

export default getters;
