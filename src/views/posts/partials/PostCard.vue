<template>
 <v-card
    max-width="344"
    v-on:click = 'redirectTo'
  >
    <v-card-text>
      <div>{{post.title}}</div>
      <div class="text--primary mt-5">
       {{post.body}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import routerConfig from '../../../configs/routerConfig';

export default {
  name: 'PostCardComponent',
  props: ['post'],
  methods: {
    redirectTo() {
      this.$router.push(`${routerConfig.Post}/${this.post.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
