<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Ecom
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="secondary"
            class="mb-4"
            :to="{ name: 'sign-up' }"
          >
            Sign up
          </v-btn>
          <v-btn
            block
            color="secondary"
            :to="{ name: 'login' }"
          >
            Login
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click="drawer=!drawer"
      />
      <v-btn
        text
        v-if="desktop"
        style="font-size: 1.2rem; text-transform: capitalize;"
        @click="routeToPage('home')"
      >
        Ecom
      </v-btn>
      <v-spacer />
      <autocomplete
        solo-inverted
        border-radius
        shaped
      />
      <v-spacer />
      <v-btn
        v-if="desktop"
        color="secondary"
        :to="{ name: 'sign-up' }"
      >
        Sign up
      </v-btn>
      <v-btn
        v-if="desktop"
        color="secondary"
        class="ml-4"
        :to="{ name: 'login' }"
      >
        Login
      </v-btn>
      <v-btn
        text
        icon
        :class="desktop ? 'mr-2 ml-4' : ''"
        @click="routeToPage('cart')"
      >
        <v-badge
          color="secondary"
          content="1"
          overlap
        >
          <v-icon> mdi-cart </v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
      <snackbar />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: {
    AppFooter,
    Snackbar
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    desktop () {
      return this.$vuetify.breakpoint.smAndUp
    }
  }
}
</script>

<style>
  .v-main {
    padding: 0;
    margin: 0;
    background: linear-gradient(165deg, var(--v-primary-lighten3), var(--v-secondary-lighten3));
  }
</style>
