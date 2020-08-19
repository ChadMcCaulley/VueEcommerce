<template>
  <v-skeleton-loader v-if="!product" />
  <div v-else>
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
    <v-row>
      Q/A
    </v-row>
    <v-divider />
    <div class="d-flex">
      <div>
        <h2 class="mb-2"> Customer Reviews </h2>
        <product-rating :product="product"/>
        <v-btn
          width="270"
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
      <div>
        <div
          v-for="review in reviews"
          :key="review.id"
        >
          <v-list-item-content>
            <div>
              <v-icon size="30"> mdi-account-circle </v-icon>
              {{ review.user.first_name }}
            </div>
            <h1
              class="d-flex align-center review-title"
            >
              <rating-icons
                :rating="review.rating"
                class="rating-icons"
              />
              {{ review.title }}
            </h1>
            <p>
              {{ review.message }}
            </p>
          </v-list-item-content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSection from '@/components/ImageSection'
import ProductPurchaseCard from '@/components/ProductPurchaseCard'
import ProductRating from '@/components/Rating/ProductRating'
import RatingIconsWithBreakdown from '@/components/Rating/RatingIconsWithBreakdown'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',
  components: {
    ImageSection,
    ProductPurchaseCard,
    ProductRating,
    RatingIconsWithBreakdown
  },
  computed: {
    ...mapGetters({
      product: 'product/product',
      reviews: 'review/reviews'
    })
  },
  methods: {
    ...mapActions({
      getProduct: 'product/getProduct',
      getReviews: 'review/getProductReviews'
    })
  },
  mounted () {
    this.getProduct(this.$route.params.id)
    this.getReviews({ productId: this.$route.params.id })
  }
}
</script>

<style lang="scss" scoped>
.review-title {
  font-weight: bold;
  font-size: .9rem;
}
.rating-icons {
  transform-origin: left;
  transform: scale(0.9);
}
</style>
