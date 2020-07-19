<template>
  <v-app-bar
    color="primary"
    app
    dark
  >
    <v-app-bar-nav-icon
      @click="$emit('input', !value)"
    />
    <v-btn
      text
      :style="`font-size: ${desktop ? '1.3rem' : '1rem'}; text-transform: capitalize;`"
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
    <div v-if="desktop && !loggedIn">
      <v-btn
        color="secondary"
        :to="{ name: 'sign-up' }"
      >
        Sign up
      </v-btn>
      <v-btn
        color="secondary"
        class="ml-4"
        :to="{ name: 'login' }"
      >
        Login
      </v-btn>
    </div>
    <v-btn
      v-else-if="desktop"
      color="warning"
      @click="logOut"
    >
      Log Out
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppBar',
  props: {
    value: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    desktop () {
      return this.$vuetify.breakpoint.smAndUp
    }
  }
}
</script>
