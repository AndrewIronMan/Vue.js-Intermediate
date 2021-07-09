import {
  required, email, min, regex,
} from 'vee-validate/dist/rules';
import {
  extend,
} from 'vee-validate';

export default () => () => {
  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  });

  extend('min', {
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
};
