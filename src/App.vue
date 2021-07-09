<template>
  <v-app id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import tokenHelper from './helpers/tokenHelper';

export default {
  name: 'App',
  components: {
    Header: () => import('./views/partials/Header.vue'),
    Footer: () => import('./views/partials/Footer.vue'),
  },
  created() {
    tokenHelper.check();
  },
};
</script>
