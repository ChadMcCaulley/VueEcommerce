<template>
  <v-skeleton-loader v-if="loading" />
  <div v-else class="mx-4">
    <v-row>
      <v-col cols="auto" v-if="product.images.length > 0">
        <image-section :images="product.images"/>
      </v-col>
      <v-col>
        <h2> {{ product.title }} </h2>
        <rating-icons-with-breakdown :product="product"/>
        <p> {{ product.description }} </p>
      </v-col>
      <v-col cols="auto">
        <product-purchase-card :product="product" />
      </v-col>
    </v-row>
    <v-divider />
    <review-list :product="product"/>
  </div>
</template>

<script>
import ImageSection from '@/components/ImageSection'
import ProductPurchaseCard from '@/components/ProductPurchaseCard'
import RatingIconsWithBreakdown from '@/components/Rating/RatingIconsWithBreakdown'
import ReviewList from '@/components/Review/ReviewList'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Product',
  components: {
    ImageSection,
    ProductPurchaseCard,
    RatingIconsWithBreakdown,
    ReviewList
  },
  props: {
    numStars: { type: [String, Number], required: false, default: null }
  },
  computed: {
    ...mapGetters({
      product: 'product/product'
    })
  },
  data: () => ({
    loading: true
  }),
  methods: {
    ...mapActions({
      getProduct: 'product/getProduct'
    }),
    ...mapMutations({
      setNumStars: 'review/setNumStars'
    })
  },
  mounted () {
    this.getProduct(this.$route.params.id).then(() => {
      this.loading = false
    })
  },
  beforeRouteLeave  (to, from, next) {
    this.setNumStars(null)
    next()
  }
}
</script>
