<template>
  <v-text-field
    v-bind="$props"
    :label="label || 'Password'"
    :counter="counter || '32'"
    :type="displayType"
    :append-icon="displayIcon"
    @click:append="toggleIcon"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { VTextField } from 'vuetify/lib'

export default {
  name: 'PasswordInput',
  extends: VTextField,
  data: () => ({
    displayType: 'password',
    displayIcon: 'mdi-eye'
  }),
  methods: {
    /**
     * Change the icon and text display type of the password input
     */
    toggleIcon () {
      this.displayType = this.displayType === 'text' ? 'password' : 'text'
      this.displayIcon = this.displayIcon === 'mdi-eye' ? 'mdi-eye-off' : 'mdi-eye'
    }
  }
}
</script>
