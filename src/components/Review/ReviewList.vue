<template>
  <div :class="mobile ? null : 'd-flex'">
    <div style="max-width: 280px;">
      <h2 class="mb-2"> Customer Reviews </h2>
      <product-rating :product="product"/>
      <v-btn
        class="mt-4"
        color="secondary"
        block
        :to="{ name: 'review-form', params: { id: product.id, title: product.title } }"
      >
        Write a Review
      </v-btn>
    </div>
    <v-divider
      class="mx-4"
      vertical
    />
    <paginated-list
      :params="reviewParams"
      url="/api/reviews/"
      entityName="review"
    >
      <template v-slot:loader="{ entitiesPerPage }">
        <v-skeleton-loader
          v-for="n in entitiesPerPage"
          :key="n"
          type="sentences"
        />
      </template>
      <template slot-scope="{ entities }">
        <review
          v-for="review in entities"
          :key="review.id"
          :review="review"
        />
      </template>
    </paginated-list>
  </div>
</template>

<script>
import ProductRating from '@/components/Rating/ProductRating'
import Review from '@/components/Review/Review'
import { mapGetters } from 'vuex'

export default {
  name: 'ReviewList',
  props: {
    product: { type: Object, required: true }
  },
  components: {
    ProductRating,
    Review
  },
  computed: {
    ...mapGetters({
      numStars: 'review/numStars'
    }),
    reviewParams () {
      const params = { product__id: this.product.id }
      if (this.numStars) params.rating = this.numStars
      return params
    },
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
