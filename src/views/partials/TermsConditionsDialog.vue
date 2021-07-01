<template>
    <div class="text-center dialog">
        <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on.stop="on">
             {{linkText}}
            </a>
        </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
            {{dialogTitle}}
            </v-card-title>
            <v-card-text class='mt-3'>
                {{dialogBody}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click.stop="dialog = false">
                I accept
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  name: 'TermsConditionsDialog',
  props: [
    'dialogTitle', 'dialogBody', 'linkText',
  ],
  data: () => ({
    dialog: false,

  }),
};
</script>
