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
        Sign Up
      </v-card-title>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
      >
        <v-form @submit.prevent="signUp">
          <v-row>
            <v-col>
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  prepend-inner-icon="mdi-account"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
            <v-col>
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  prepend-inner-icon="mdi-account"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-email"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="required|min:8|max:32"
            name="Password"
            vid="password"
            v-slot="{ errors }"
          >
            <password-input
              v-model="password"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="required|confirmed:password"
            name="Password"
            v-slot="{ errors }"
          >
            <password-input
              v-model="confirmPassword"
              label="Confirm Password"
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
              Sign Up
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
  name: 'SignUp',
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
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
    async signUp () {
      this.loading = true
      const params = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password1: this.password,
        password2: this.confirmPassword
      }
      await this.$store.dispatch('auth/registration', params)
      if (this.loggedIn) this.$router.push({ name: 'home' })
      this.loading = false
      this.failed = true
      this.password = null
      this.confirmPassword = null
      this.$refs.observer.reset()
    }
  }
}
</script>
