<template>
  <div >
    <v-app-bar>
      <router-link to="/">
        <v-row class="ml-5">
          <img src="logo.png" class="logo" alt="logo" />
        </v-row>
      </router-link>
      <v-spacer></v-spacer>
      <ul class="linkList">
        <li v-if="isShowPosts">
          <span v-on:click="$router.push({
            path:`${routerConfig.Posts}/All`, query:{ currentPage: 1 }})">Posts</span>
        </li>
        <li v-if="isLogined">
          <span v-on:click="logout">Logout</span>
        </li>
        <li v-else>
          <span v-on:click="$router.push(routerConfig.Auth)">Auth</span>
        </li>
      </ul>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import routerConfig from '../../configs/routerConfig';

export default {
  name: 'Header',
  data: () => ({
    routerConfig,
    isShowPosts: true,
    isShowAuth: true,
  }),
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
  },
  computed: {
    ...mapState('auth', ['isLogined']),
  },
  watch: {
    $route: {
      handler(route) {
        if (route?.name === 'Posts') {
          this.isShowPosts = false;
        } else this.isShowPosts = true;
      },
      deep: true,
      immediate: true,
    },
    isLogined(newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        this.$router.push(routerConfig.Auth);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 30%;
}
.linkList {
  display: flex;
  li {
    list-style: none;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
