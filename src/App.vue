<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link :to="{ name: 'home' }">
        <v-img
          alt="Rotten Tomatoes"
          class="shrink mr-2"
          src="@/assets/AppBarLogo.svg"
          width="40"
          contain
        />
      </router-link>
      <v-spacer />
      <sign-up-dialog />
      <log-in-dialog />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SignUpDialog from '@/components/SignUpDialog'
import LogInDialog from '@/components/LogInDialog'

export default {
  name: 'App',
  components: {
    SignUpDialog,
    LogInDialog
  }
}
</script>
