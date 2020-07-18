<template>
  <v-app>
    <nav-drawer v-model="drawer" />
    <app-bar v-model="drawer" />
    <v-main>
      <router-view />
      <snackbar />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
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
  })
}
</script>

<style>
  #app {
    background: linear-gradient(130deg, var(--v-primary-lighten5), var(--v-secondary-lighten5));
  }
</style>
