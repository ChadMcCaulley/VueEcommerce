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
        @mouseover="getBreakdown"
        v-bind="attrs"
        v-on="on"
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
      </span>
    </template>
    <v-card>
      <v-container>
        <product-rating
          :product="product"
          :breakdown="breakdown"
        >
          <v-divider class="my-4"/>
          <router-link :to="{ name: 'product', params: { id: product.id, title: product.title } }">
            <div class="text-center"> See All Reviews </div>
          </router-link>
        </product-rating>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
import ProductRating from '@/components/Rating/ProductRating'
import { mapActions } from 'vuex'

export default {
  name: 'RatingIconsWithBreakdown',
  components: {
    ProductRating
  },
  props: {
    product: { type: Object, required: true }
  },
  data: () => ({
    breakdown: null,
    ratingMenu: false
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
