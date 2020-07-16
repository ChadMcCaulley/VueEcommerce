<template>
  <v-footer
    v-bind="$props"
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link.name"
        @click="$router.push({ name: link.route })"
        color="white"
        text
        rounded
        class="my-2"
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
