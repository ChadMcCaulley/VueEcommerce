<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="snackbar.color"
    :timeout="snackbar.timeout || '2000'"
  >
    {{ snackbar.message }}
    <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="white"
          v-bind="attrs"
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Snackbar',
  data: () => ({
    showSnackbar: false
  }),
  computed: {
    ...mapState(['snackbar'])
  },
  watch: {
    snackbar () {
      this.showSnackbar = true
    }
  }
}
</script>
