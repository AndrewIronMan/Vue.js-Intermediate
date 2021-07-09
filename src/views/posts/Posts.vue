<template>
  <div class="wrap">
    <div class="content  px-5 py-4 pt-10">
      <PostsFilterComponent
        v-on:setAuthor="setAuthor"
        :authors="authorsName"
        :defaultValue="authorName"
      />
      <div v-if="posts" class="d-flex flex-wrap">
        <PostCardComponent
          v-for="post of posts.posts"
          :key="post.id"
          :post="post"
          class="card my-3 mr-5"
        />
      </div>
      <PostsPlaceholderComponent v-else text='Posts do not exist'/>
    </div>
    <PostsPaginationComponent
      v-on:perPage="setPerPage"
      v-on:nextPage="setNextPage"
      :page="nextPage"
      :initPerPage="initPerPage"
      :totalPages="posts.meta.totalPages"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import redirectTo from '../../helpers/redirectTo';

export default {
  name: 'PostsComponent',
  data: () => ({
    initPerPage: 10,
    perPage: 10,
    nextPage: undefined,
    author: undefined,
    totalPages: 1,
  }),
  props: ['userId'],
  components: {
    PostCardComponent: () => import('./partials/PostCard.vue'),
    PostsPlaceholderComponent: () => import('./partials/PostsPlaceholder.vue'),
    PostsPaginationComponent: () => import('./partials/PostsPagination.vue'),
    PostsFilterComponent: () => import('./partials/PostsFilter.vue'),
  },

  methods: {
    ...mapActions({
      setAuthorsToStore: 'authors/setAuthorsToStore',
      getPostsAction: 'posts/getPosts',
    }),
    setPerPage(val) {
      this.perPage = +val;
      redirectTo({ query: { ...this.$route.query, perPage: val } });
    },
    setNextPage(page) {
      this.nextPage = +page;
      redirectTo({ query: { ...this.$route.query, currentPage: page } });
    },
    setAuthor(author) {
      const authorId = this.getAuthors.find((item) => item.username === author)?.id;
      this.author = authorId;
      redirectTo({ params: { userId: authorId }, query: { ...this.$route.query } });
    },
    initFilterParams() {
      if (this.$route.query.perPage) this.perPage = +this.$route.query.perPage;
      if (this.$route.query.perPage) this.initPerPage = +this.$route.query.perPage;
      if (this.$route.params.userId) this.author = +this.$route.params.userId;
      if (this.$route.query.currentPage) {
        this.setNextPage(+this.$route.query.currentPage);
      } else {
        this.setNextPage(1);
      }
    },
    setSearchString() {
      redirectTo({
        query: {
          ...this.$route.query,
          perPage: +this.perPage,
          currentPage: +this.nextPage,
        },
        params: { userId: this.$route.params.userId ? this.$route.params.userId : 'All' },
      });
    },
  },
  computed: {
    ...mapGetters({
      postsGetter: 'posts/getPosts',
      getAuthors: 'authors/getAuthors',
    }),
    authorsName() {
      return this.getAuthors.map((author) => author.username);
    },
    posts() {
      if (this.userId && this.userId !== 'All') {
        return this.postsGetter({
          userId: this.author,
          nextPage: this.nextPage,
          perPage: this.perPage,
        });
      }
      return this.postsGetter({
        nextPage: this.nextPage,
        perPage: this.perPage,
      });
    },
    authorName() {
      return this.getAuthors.find((item) => item.id === this.author)?.username;
    },
  },
  watch: {
    posts: {
      deep: true,
      emediate: true,
      handler(newVal, oldVal) {
        if (
          newVal.meta.totalPages < oldVal.meta.currentPage
          || (newVal.meta.currentPage < oldVal.meta.currentPage
            && newVal.meta.perPage > oldVal.meta.perPage)
        ) {
          const currentPage = oldVal.meta.currentPage ? oldVal.meta.currentPage : 1;
          this.nextPage = newVal.meta.currentPage > 0 ? newVal.meta.currentPage : currentPage;
          redirectTo({
            query: {
              ...this.$route.query,
              currentPage: newVal.meta.currentPage > 0 ? newVal.meta.currentPage : currentPage,
            },
          });
        }
      },
    },
  },

  created() {
    this.setAuthorsToStore();
    this.getPostsAction();
    this.initFilterParams();
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 83vh;
}
</style>
