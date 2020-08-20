<template>
  <v-skeleton-loader v-if="loading" />
  <div v-else class="mx-4">
    <v-row>
      <v-col cols="auto" v-if="product.images.length > 0">
        <image-section :images="product.images"/>
      </v-col>
      <v-col>
        <h2> {{ product.title }} </h2>
        <rating-icons-with-breakdown :product="product" />
        <p> {{ product.description }} </p>
      </v-col>
      <v-col cols="auto">
        <product-purchase-card :product="product" />
      </v-col>
    </v-row>
    <v-divider />
    <div class="d-flex">
      <div>
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
  </div>
</template>

<script>
import ImageSection from '@/components/ImageSection'
import ProductPurchaseCard from '@/components/ProductPurchaseCard'
import ProductRating from '@/components/Rating/ProductRating'
import RatingIconsWithBreakdown from '@/components/Rating/RatingIconsWithBreakdown'
import Review from '@/components/Review'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',
  components: {
    ImageSection,
    ProductPurchaseCard,
    ProductRating,
    RatingIconsWithBreakdown,
    Review
  },
  props: {
    numStars: { type: [String, Number], required: false, default: null }
  },
  computed: {
    ...mapGetters({
      product: 'product/product'
    }),
    reviewParams () {
      const params = { product__id: this.product.id }
      if (this.numStars) params.rating = this.numStars
      return params
    }
  },
  data: () => ({
    loading: true
  }),
  methods: {
    ...mapActions({
      getProduct: 'product/getProduct'
    })
  },
  mounted () {
    this.getProduct(this.$route.params.id).then(() => {
      this.loading = false
    })
  }
}
</script>
