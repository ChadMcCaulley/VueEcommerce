<template>
  <v-container v-if="!actualBreakdown">
    <v-skeleton-loader type="article"/>
  </v-container>
  <div v-else>
    <div class="d-flex align-center">
      <rating-icons :rating="product.rating" />
      <div
        class="ml-2 font-weight-bold"
        style="font-size: 1.3rem"
      >
        {{ product.rating }} out of 5
      </div>
    </div>
    <div class="my-3">
      {{ product.num_reviews }} customer reviews
    </div>
    <router-link
      v-for="breakdown in ratingsBreakdown"
      :key="breakdown[0]"
      :to="{ name: 'product', params: { id: product.id, title: product.title } }"
    >
      <rating-percent
        :num-stars="breakdown[0]"
        :percent="breakdown[1]"
      />
    </router-link>
    <slot />
  </div>
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
    product: { type: Object, required: true }
  },
  data: () => ({
    ratingMenu: false
  }),
  computed: {
    actualBreakdown () {
      if (!this.breakdown && !('rating_breakdown' in this.product)) return null
      if ('rating_breakdown' in this.product) return this.product.rating_breakdown
      return this.breakdown.rating_breakdown
    },
    ratingsBreakdown () {
      return Object.entries(this.actualBreakdown)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
