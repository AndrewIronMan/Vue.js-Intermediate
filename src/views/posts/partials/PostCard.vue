<template>
 <v-card
    max-width="344"
    v-on:click = 'redirectTo({ path:`${routerConfig.Post}/${post.id}`})'
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
import redirectTo from '../../../helpers/redirectTo';

export default {
  name: 'PostCardComponent',
  data: () => ({
    redirectTo,
    routerConfig,
  }),
  props: ['post'],
};
</script>
