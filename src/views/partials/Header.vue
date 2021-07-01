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
        <li v-if="isShowPosts && isLogined">
          <span v-on:click="redirectTo({
            path:`${routerConfig.Posts}/All`,query:{ currentPage: 1, perPage:10 }})">Posts</span>
        </li>
        <li v-if="isLogined">
          <span v-on:click="logout">Logout</span>
        </li>
        <li v-else>
          <span v-on:click="redirectTo({ path:routerConfig.Auth})">Auth</span>
        </li>
      </ul>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import routerConfig from '../../configs/routerConfig';
import redirectTo from '../../helpers/redirectTo';

export default {
  name: 'Header',
  data: () => ({
    redirectTo,
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
        redirectTo({ path: routerConfig.Auth });
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
