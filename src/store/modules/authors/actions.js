import getData from '../../../helpers/getData';

const actions = {
  async setAuthorsToStore({ commit }) {
    const authors = (await getData(`${process.env.VUE_APP_API_BASE_URL}/users`)).map((author) => ({
      id: author.id,
      username: author.username,
    }));
    commit('setAuthors', authors);
  },
};

export default actions;
