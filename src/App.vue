<template>
  <v-app>
    <nav-drawer
      v-model="drawer"
      :logged-in="loggedIn"
      @logOut="logOut"
    />
    <app-bar
      v-model="drawer"
      :logged-in="loggedIn"
      @logOut="logOut"
    />
    <v-main>
      <router-view />
      <snackbar />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppBar from '@/components/AppBar'
import AppFooter from '@/components/AppFooter'
import NavDrawer from '@/components/NavDrawer'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: {
    AppBar,
    AppFooter,
    NavDrawer,
    Snackbar
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    ...mapActions({
      refreshToken: 'auth/refreshToken',
      logOut: 'auth/logOut'
    })
  },
  computed: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' })
  },
  mounted () {
    this.refreshToken()
  }
}
</script>

<style>
  #app {
    background: linear-gradient(130deg, var(--v-primary-lighten5), var(--v-secondary-lighten5));
  }
</style>
