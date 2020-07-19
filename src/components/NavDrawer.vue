<template>
  <v-navigation-drawer
    v-bind="$props"
    app
    temporary
    @input="$emit('input', $event)"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Ecom
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <div class="pa-2">
      <div v-if="!loggedIn">
        <v-btn
          block
          color="secondary"
          class="mb-4"
          :to="{ name: 'sign-up' }"
        >
          Sign up
        </v-btn>
        <v-btn
          block
          color="secondary"
          :to="{ name: 'login' }"
        >
          Login
        </v-btn>
      </div>
      <v-btn
        v-else
        block
        color="warning"
        @click="logOut"
      >
        Log Out
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavDrawer',
  props: {
    value: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' })
  }
}
</script>
