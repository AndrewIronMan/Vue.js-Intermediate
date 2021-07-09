<template>
  <div>
    <v-container>
      <div v-if="post" class="post">
        <h2>{{ post.title }}</h2>
        <p class="mt-3">{{ post.body }}</p>
      </div>
       <PostsPlaceholderComponent v-else text='Post do not exist' class="post"/>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'PostComponent',
  components: {
    PostsPlaceholderComponent: () => import('./partials/PostsPlaceholder.vue'),
  },
  props: ['id'],
  data: () => ({
    post: undefined,
  }),
  computed: {
    ...mapGetters({ getPostById: 'posts/getPostById' }),
    ...mapState({ posts: 'posts/posts' }),
  },
  methods: {
    ...mapActions({ getPosts: 'posts/getPosts' }),
  },
  async mounted() {
    if (this.posts) {
      this.post = this.getPostById(+this.id);
    } else {
      await this.getPosts();
      this.post = this.getPostById(+this.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.post {
  min-height: 85vh;
}
</style>
