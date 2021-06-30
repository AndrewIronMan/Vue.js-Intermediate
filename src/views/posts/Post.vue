<template>
  <div>
    <v-container>
      <div class="post">
        <h2>{{post.title}}</h2>
        <p class='mt-3'>{{post.body}}</p>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostComponent',
  props: ['id'],
  computed: {
    ...mapGetters({ getPostById: 'posts/getPostById' }),
  },
  created() { this.post = this.getPostById(+this.id); },
};
</script>

<style lang="scss" scoped>
.post {
  min-height: 85vh;
}
</style>
