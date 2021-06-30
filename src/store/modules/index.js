import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './auth';
import postsModule from './posts';
import authorsModule from './authors';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    auth: authModule,
    posts: postsModule,
    authors: authorsModule,
  },
});
export default store;
