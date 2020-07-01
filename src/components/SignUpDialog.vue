<template>
  <v-dialog
    v-model="showDialog"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        text
        class="mr-2"
      >
        Sign Up
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        class="headline primary white--text"
        primary-title
      >
        Sign Up
        <v-spacer />
        <v-btn
          icon
          dark
          @click="showDialog = false"
        >
          <v-icon> mdi-close-circle </v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <v-text-field
          label="Username"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          label="Password"
          append-icon="mdi-eye"
        />
        <div class="mt-4 text-center">
          <v-btn
            class="dark"
            color="info"
          >
            Sign Up
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SignUpDialog',
  data: () => ({
    showDialog: false
  })
}
</script>
