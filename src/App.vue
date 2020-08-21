<template>
  <v-app id="main">
    <nav-drawer
      v-model="drawer"
      :logged-in="loggedIn"
      @log-out="logOut"
    />
    <app-bar
      v-model="drawer"
      :logged-in="loggedIn"
      :badge-number="numOrders"
      @log-out="logOut"
    />
    <v-main>
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
      logOut: 'auth/logOut',
      refreshToken: 'auth/refreshToken',
      getCurrentOrder: 'order/getCurrentOrder'
    })
  },
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn',
      order: 'order/order'
    }),
    numOrders () {
      if (!this.order) return 0
      return this.order.length
    }
  },
  async mounted () {
    await Promise.all([
      this.refreshToken(),
      this.getCurrentOrder()
    ])
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
.title {
  font-size: 1.05rem;
  line-height: 1.35;
  word-break: keep-all;
}
</style>
