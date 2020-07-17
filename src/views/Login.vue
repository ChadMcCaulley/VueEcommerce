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
      <ValidationObserver v-slot="{ invalid }">
        <v-form @submit.prevent="logIn">
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
            <v-text-field
              v-model="password"
              label="Password"
              counter="32"
              :type="displayType"
              :append-icon="displayIcon"
              :error-messages="errors"
              @click:append="toggleIcon"
            />
          </ValidationProvider>
          <div class="mt-4 text-center">
            <v-btn
              color="secondary"
              type="submit"
              :disabled="invalid"
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
export default {
  name: 'Login',
  data: () => ({
    showDialog: false,
    username: null,
    password: null,
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
    },
    /**
     * Try to log the user into the server based on their input
     */
    logIn () {
      const params = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('auth/login', params)
    }
  }
}
</script>
