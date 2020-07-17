<template>
  <v-snakcbar
    :value="true"
    :color="snackbar.color"
    v-bind="$props"
  >
    {{ snackbar.text }}
  </v-snakcbar>
</template>

<script>
import { VSnackbar } from 'vuetify/lib'
import { mapState } from 'vuex'

export default {
  name: 'Snackbar',
  extends: VSnackbar,
  computed: {
    ...mapState(['snackbar'])
  },
  watch: {
    snackbar () {
      console.log(this.snackbar)
    }
  }
}
</script>
