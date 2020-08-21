<template>
  <v-footer
    v-bind="$props"
    color="secondary lighten-1"
    class="mt-4"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link.name"
        @click="routeToPage(link.route)"
        color="white"
        text
        rounded
        class="my-2"
        style="font-size: 0.8rem;"
      >
        {{ link.name }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
import { VFooter } from 'vuetify/lib'

export default {
  name: 'AppFooter',
  extends: VFooter,
  data: () => ({
    links: [
      { name: 'Home', route: 'home' },
      { name: 'About Us', route: 'home' },
      { name: 'Services', route: 'home' },
      { name: 'Contact Us', route: 'home' }
    ]
  })
}
</script>
