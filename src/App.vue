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
        style="font-size: 1.2rem; text-transform: capitalize;"
        @click="$router.push({ name: 'home' })"
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
        color="secondary"
        :to="{ name: 'sign-up' }"
      >
        Sign up
      </v-btn>
      <v-btn
        color="secondary darken-2"
        class="ml-4"
        :to="{ name: 'login' }"
      >
        Login
      </v-btn>
      <v-btn
        text
        icon
        class="mr-2 ml-4"
        @click="$router.push({ name: 'cart' })"
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
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter'

export default {
  name: 'App',
  components: {
    AppFooter
  },
  data: () => ({
    drawer: false
  })
}
</script>
