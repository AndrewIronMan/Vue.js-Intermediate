<template>
  <v-app id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header: () => import('./views/partials/Header.vue'),
    Footer: () => import('./views/partials/Footer.vue'),
  },
  methods: {
    ...mapActions({
      getAuthors: 'authors/getAuthors',
      getPostsAction: 'posts/getPosts',
    }),
  },
  created() {
    this.getAuthors();
    this.getPostsAction();
  },
};
</script>
