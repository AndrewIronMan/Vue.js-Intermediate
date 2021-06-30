<template>
  <v-footer padless>
    <v-col class="text-center mt-2 " cols="12">
      {{ new Date().getFullYear() }} — <strong>JustCoded</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped></style>
