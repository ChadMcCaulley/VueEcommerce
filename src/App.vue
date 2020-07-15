<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link :to="{ name: 'home' }">
        <v-img
          alt="MediaScape"
          class="shrink mr-2"
          src="@/assets/Logo.png"
          width="40"
          contain
        />
      </router-link>
      <v-spacer />
      <autocomplete
        solo-inverted
      />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
