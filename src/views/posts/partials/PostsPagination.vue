<template>
  <div class="wraper">
    <div>
      <v-pagination v-model='currentPage' :length='totalPages' :total-visible='10'>
      </v-pagination>
    </div>
    <div class="select">
      <v-select class="mb-6" v-model="perPage" :items="items"></v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsPaginationComponent',
  data: () => ({
    items: ['10', '15', '20', '25'],
    value: '10',
  }),
  props: ['page', 'totalPages', 'initPerPage'],
  computed: {
    currentPage: {
      get() { return this.page; },
      set(newVal) { this.$emit('nextPage', newVal); },
    },
    perPage: {
      get() { return this.initPerPage ? `${this.initPerPage}` : this.value; },
      set(newVal) { this.$emit('perPage', newVal); },
    },
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  position: relative;
}
.select {
  position: absolute;
  right: 30px;
  bottom: 0;
  width: 50px;
  height: 55px;
}
@media (max-width: 768px) {
  .wraper{
    position: relative;
    margin-bottom: 50px;
  }
  .select{
    left:calc( 50% - 25px );
    top: 35px;
  }
}
</style>
