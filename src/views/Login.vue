<template>
  <v-container
    fill-height
    fluid
  >
    <v-card
      width="500"
      class="ma-auto pa-4"
    >
      <v-card-title class="justify-center">
        Login
      </v-card-title>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
      >
        <v-form @submit.prevent="logIn">
          <p
            v-if="failed && !loading"
            style="color: var(--v-error-base); font-size: .9rem;"
          >
            The username and password you entered did not match our records. Please double-check and try again.
          </p>
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="username"
              label="Username"
              prepend-inner-icon="mdi-account"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="required|min:8|max:32"
            name="Password"
            v-slot="{ errors }"
          >
            <password-input
              v-model="password"
              :error-messages="errors"
            />
          </ValidationProvider>
          <div class="mt-4 text-center">
            <v-btn
              color="secondary"
              type="submit"
              :loading="loading"
              :disabled="invalid || loading"
            >
              Log In
            </v-btn>
          </div>
        </v-form>
      </ValidationObserver>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    username: null,
    password: null,
    failed: false,
    loading: false
  }),
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn'
    })
  },
  methods: {
    /**
     * Try to log the user into the server based on their input
     */
    async logIn () {
      this.loading = true
      const params = {
        username: this.username,
        password: this.password
      }
      await this.$store.dispatch('auth/login', params)
      if (this.loggedIn) this.$router.push({ name: 'home' })
      this.loading = false
      this.failed = true
      this.password = null
      this.$refs.observer.reset()
    }
  }
}
</script>
