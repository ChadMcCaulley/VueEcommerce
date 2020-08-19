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
  </div>
</template>

<script>
import ImageSection from '@/components/ImageSection'
import ProductPurchaseCard from '@/components/ProductPurchaseCard'
import RatingIconsWithBreakdown from '@/components/RatingIconsWithBreakdown'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',
  components: {
    ImageSection,
    RatingIconsWithBreakdown,
    ProductPurchaseCard
  },
  computed: {
    ...mapGetters('product', ['product'])
  },
  methods: {
    ...mapActions('product', [
      'getProduct'
    ])
  },
  mounted () {
    this.getProduct(this.$route.params.id)
  }
}
</script>
