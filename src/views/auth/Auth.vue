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
          :rules="{required:true}"
          name="agree"
        >
          <div class="custom-checbox-class">
            <v-checkbox v-model="agree" required :error-messages="errors">
            </v-checkbox>
            <TermsConditionsDialog
              :dialogTitle='mockTexts.dialogTitle'
              :dialogBody='mockTexts.dialogBody'
            :linkText='mockTexts.linkText'/>
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
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { mapActions } from 'vuex';
import TermsConditionsDialog from '../partials/TermsConditionsDialog.vue';
import routerConfig from '../../configs/routerConfig';
import redirectTo from '../../helpers/redirectTo';
import mockTexts from '../../mocks/texts';
import authFormRukes from '../../helpers/authFormRukes';

setInteractionMode('eager');
authFormRukes()();

export default {
  name: 'AuthComponent',
  components: {
    ValidationProvider,
    ValidationObserver,
    TermsConditionsDialog,
  },
  data: () => ({
    mockTexts,
    genderList: ['Female', 'Male'],
    gender: '',
    password: '',
    email: '',
    agree: null,
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
      this.reset();
      if (!ready) {
        return;
      }
      redirectTo({ path: `${routerConfig.Posts}/All` });
    },
    reset() {
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
