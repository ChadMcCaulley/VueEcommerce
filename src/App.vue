<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/AppBarLogo.svg"
        transition="scale-transition"
        width="40"
      />
      <v-spacer />
      <v-btn
        :to="{ name: 'sign-in' }"
        text
        class="mr-2"
      >
        SIGN UP
      </v-btn>
      <v-btn
        :to="{ name: 'sign-up' }"
        text
        class="mr-2"
      >
        SIGN IN
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({})
}
</script>
