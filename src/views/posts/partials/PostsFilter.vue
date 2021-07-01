<template>
  <div class="mx-5">
    <v-row justify="center" >
      <v-select
        v-model="author"
        :items="authors"
        class="mb-6 "
        :value='author'
        label="Filter by user name"
      ></v-select>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PostsFilterComponent',
  data: () => ({
    author: 'All',
  }),
  props: ['authors', 'defaultValue'],
  watch: {
    author(newVal) {
      this.$emit('setAuthor', newVal);
    },
    defaultValue(newVal) {
      this.author = newVal;
    },
  },

};
</script>
