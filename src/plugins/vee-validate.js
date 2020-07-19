import { extend, localize } from 'vee-validate'
import { required, email, min, max, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'This field must be a valid email'
})

extend('min', {
  ...min,
  message: '{_field_} must contain at least {length} characters'

})

extend('max', {
  ...max,
  message: '{_field_} cannot contain more than {length} characters'
})

extend('confirmed', {
  ...confirmed,
  message: 'Passwords do not match'
})

localize({
  en: {
    fields: {
      password: {
        required: 'Password cann be empty',
        max: 'Password cannot contain more than {length} characters',
        min: 'Password must contain at least {length} characters'
      }
    }
  }
})
