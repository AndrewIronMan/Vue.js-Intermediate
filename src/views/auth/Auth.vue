<template>
  <div class="auth d-flex flex-column justify-center align-center">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider v-slot="{ errors }" name="email" rules="required|email">
          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Password"
          :rules="{
            required: true,
            min: 8,
            regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@+#$%^&*])(?=.{8,})'
          }"
        >
          <v-text-field
            v-model="password"
            :counter="8"
            :error-messages="errors"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="Gender" rules="required">
          <v-radio-group v-model="gender">
            <v-radio
              v-for="g in genderList"
              :key="g"
              :label="g"
              :value="g"
              :error-messages="errors"
            ></v-radio>
          </v-radio-group>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          :rules="{
            required: true
          }"
          name="checkbox"
        >
          <div class="custom-checbox-class">
            <v-checkbox v-model="agree" :error-messages="errors">
            </v-checkbox>
              <div class="text-center dialog">
                <v-dialog v-model="dialog" width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <a v-bind="attrs" v-on.stop="on">
                      I agree with Terms & Conditions
                    </a>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Terms & Conditions
                    </v-card-title>
                    <v-card-text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          </div>
        </validation-provider>
        <v-btn class="mr-4" type="submit" :disabled="!(agree === true && !invalid)">
          submit
        </v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import {
  required, email, min, regex,
} from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate';
import { mapActions } from 'vuex';
import routerConfig from '../../configs/routerConfig';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
});

extend('changed', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
});
extend('regex', {
  ...regex,
  message: '{_field_} must contain uppercase and lowercase characters, number and a symbol',
});

extend('email', {
  ...email,
  message: 'Email must be valid',
});

export default {
  name: 'AuthComponent',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    genderList: ['Female', 'Male'],
    gender: '',
    password: '',
    email: '',
    agree: null,
    dialog: false,
  }),

  methods: {
    ...mapActions({ auth: 'auth/registration' }),
    async submit() {
      this.$refs.observer.validate();
      const ready = await this.auth({
        email: this.email,
        password: this.password,
        agree: this.agree,
        gender: this.gender,
      });
      this.clear();
      if (!ready) {
        return;
      }
      this.$router.push(`${routerConfig.Posts}/All`);
    },
    clear() {
      this.email = '';
      this.password = '';
      this.agree = '';
      this.gender = '';
      this.$refs.observer.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  min-height: 87.5vh;
}
.auth-form {
  min-width: 400px;
  max-width: 600px;
}
.dialog {
  z-index: 5;
}
.custom-checbox-class{
  display: flex;
  align-items: center;
}
</style>
