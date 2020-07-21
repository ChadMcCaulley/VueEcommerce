<template>
  <v-app-bar
    color="primary"
    app
    dark
  >
    <v-app-bar-nav-icon
      name="Navigation Drawer Button"
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
        name="Sign Up Button"
        color="secondary"
        :to="{ name: 'sign-up' }"
      >
        Sign up
      </v-btn>
      <v-btn
        name="Login Button"
        color="secondary"
        class="ml-4"
        :to="{ name: 'login' }"
      >
        Login
      </v-btn>
    </div>
    <v-btn
      v-else-if="desktop"
      text
      color="warning"
      @click="$emit('logOut')"
    >
      Log Out
    </v-btn>
    <v-btn
      text
      icon
      name="Logout Button"
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
export default {
  name: 'AppBar',
  props: {
    value: { type: Boolean, required: true },
    loggedIn: { type: Boolean, required: true }
  },
  computed: {
    desktop () {
      return this.$vuetify.breakpoint.smAndUp
    }
  }
}
</script>
