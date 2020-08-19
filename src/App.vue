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
    <v-main id="main">
      <router-view id="app-view" />
      <snackbar />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppBar from '@/components/App/AppBar'
import AppFooter from '@/components/App/AppFooter'
import NavDrawer from '@/components/App/NavDrawer'
import Snackbar from '@/components/App/Snackbar'

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

<style lang="scss" scoped>
#app-view {
  margin: 0 1rem;
}
#main {
  background-color: var(--v-background-base);
}
</style>
