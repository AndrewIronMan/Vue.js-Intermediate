<template>
  <div class="NotFound">
    <v-container>
      <v-row justify="center" class='mt-10'>
        <v-card height="82vh" color="transparent" flat>
          <div class="display-3 mt-5">Page not found.</div>
          <div class="grey--text lighten-5">
            The page you are trying to get to never existed in this reality, or has migrated to a
            parallel universe.
          </div>
          <div class="paragraph-text mt-2">
            <br />
            <br />Try going back to home page and repeating your action. Or, contact helpdesk for
            support.
          </div>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'NotFoundComponent',
};
</script>

<style lang="scss">
.paragraph-text {
  font-size: 18px;
}
</style>
