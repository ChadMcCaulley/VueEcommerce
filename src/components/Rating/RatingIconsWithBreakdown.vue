<template>
  <card-rating
    v-if="product.num_reviews > 0"
    :product="product"
    :breakdown="breakdown"
    @mouseover="getBreakdown"
  >
    <div
      style="transform-origin: left; transform: scale(0.85);"
      class="d-flex mb-1"
    >
      <rating-icons :rating="product.rating" />
      <v-icon> mdi-chevron-down </v-icon>
      <router-link
        :to="{ name: 'product', params: { title: product.title, id: product.id } }"
        class="special-atag"
        color="accent"
      >
        {{ product.num_reviews }}
      </router-link>
    </div>
  </card-rating>
</template>

<script>
import CardRating from '@/components/Rating/CardRating'
import { mapActions } from 'vuex'

export default {
  name: 'RatingIconsWithBreakdown',
  components: {
    CardRating
  },
  props: {
    product: { type: Object, required: true }
  },
  data: () => ({
    breakdown: null
  }),
  methods: {
    ...mapActions({
      getRatingBreakdown: 'product/getRatingBreakdown'
    }),
    getBreakdown () {
      if (this.breakdown !== null) return
      this.getRatingBreakdown(this.product.id).then((res) => {
        this.breakdown = res
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  color: var(--v-primary-base) !important;
}
.special-atag {
  text-decoration: none;
  font-size: 1.1rem;
  color: var(--v-primary-base) !important;
}
.special-atag:hover {
  text-decoration: underline;
  color: var(--v-secondary-base) !important;
}
</style>
