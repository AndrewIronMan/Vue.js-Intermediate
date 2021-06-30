const getters = {
  getAuthors: (state) => [{ id: 'All', username: 'All' }].concat(state.authors),
};

export default getters;
