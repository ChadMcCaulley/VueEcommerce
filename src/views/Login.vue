<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols=6>
        <v-card
          dark
          class="pa-4"
        >
          <v-card-title class="justify-center">
            Login
          </v-card-title>
          <ValidationObserver v-slot="{ invalid }">
            <v-form @submit.prevent="logIn">
              <ValidationProvider
                rules="required|email"
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
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="password"
                  label="Password"
                  :type="displayType"
                  :append-icon="displayIcon"
                  :error-messages="errors"
                  @click:append="toggleIcon"
                />
              </ValidationProvider>
              <div class="mt-4 text-center">
                <v-btn
                  light
                  color="white"
                  type="submit"
                  :disabled="invalid"
                >
                  Log In
                </v-btn>
              </div>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
  .v-card {
    background: linear-gradient(130deg, var(--v-primary-lighten1), var(--v-secondary-lighten1));
  }
</style>
