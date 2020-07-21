<template>
  <div
    style="transform-origin: left; transform: scale(0.85)"
    class="d-flex"
  >
    <v-menu
      ref="ratingMenu"
      v-model="ratingMenu"
      :close-on-content-click="false"
      transition="slide-y-transition"
      open-on-hover
      open-on-click
      offset-y
      nudge-left="50"
      max-width="300px"
      min-width="300px"
      z-index="99"
    >
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >
          <rating-icons :rating="rating" />
        </span>
      </template>
      <v-card width="300px">
        <v-container>
          <div class="d-flex align-center">
            <rating-icons :rating="rating" />
            <div
              class="ml-2 font-weight-bold"
              style="font-size: 1.3rem"
            >
              {{ rating }} out of 5
            </div>
          </div>
          <div class="my-3">
            {{ numRatings }} customer reviews
          </div>
          <router-link
            :to="{ name: 'item', params: { id, title } }"
          >
            <rating-percent num-stars="5" percent="30"/>
          </router-link>
          <rating-percent num-stars="4" percent="20"/>
          <rating-percent num-stars="3" percent="10"/>
          <rating-percent num-stars="2" percent="20"/>
          <rating-percent num-stars="1" percent="30"/>
          <v-divider class="my-4"/>
          <router-link :to="{ name: 'item', params: { id, title } }">
            <div class="text-center"> See All Reviews </div>
          </router-link>
        </v-container>
      </v-card>
    </v-menu>
    <v-icon> mdi-chevron-down </v-icon>
      <router-link
        :to="{ name: 'item', params: { title, id } }"
        color="accent"
      >
        {{ numRatings }}
      </router-link>
  </div>
</template>

<script>
import RatingPercent from '@/components/RatingPercent'
import RatingIcons from '@/components/RatingIcons'

export default {
  name: 'CardRating',
  extends: RatingIcons,
  components: {
    RatingPercent
  },
  props: {
    numRatings: { type: Number, required: true },
    id: { type: [Number, String], required: true },
    title: { type: String, required: true }
  },
  data: () => ({
    ratingMenu: false
  })
}
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
