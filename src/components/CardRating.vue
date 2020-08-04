<template>
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
        <slot />
      </span>
    </template>
    <v-card width="300px">
      <v-container v-if="!breakdown">
        <v-skeleton-loader type="article"/>
      </v-container>
      <v-container v-else>
        <div class="d-flex align-center">
          <rating-icons :rating="breakdown.rating" />
          <div
            class="ml-2 font-weight-bold"
            style="font-size: 1.3rem"
          >
            {{ breakdown.rating }} out of 5
          </div>
        </div>
        <div class="my-3">
          {{ breakdown.num_ratings }} customer reviews
        </div>
        <router-link
          v-for="breakdown in ratingsBreakdown"
          :key="breakdown[0]"
          :to="{ name: 'product', params: { id, title } }"
        >
          <rating-percent
            :num-stars="breakdown[0]"
            :percent="breakdown[1]"
          />
        </router-link>
        <v-divider class="my-4"/>
        <router-link :to="{ name: 'product', params: { id, title } }">
          <div class="text-center"> See All Reviews </div>
        </router-link>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
import RatingPercent from '@/components/RatingPercent'

export default {
  name: 'CardRating',
  components: {
    RatingPercent
  },
  props: {
    breakdown: { type: Object, required: false, default: null },
    id: { type: [Number, String], required: true },
    title: { type: String, required: true }
  },
  data: () => ({
    ratingMenu: false
  }),
  computed: {
    ratingsBreakdown () {
      return Object.entries(this.breakdown.rating_breakdown)
    }
  }
}
</script>
