<template>
  <v-card
    width="500"
    height="100%"
  >
    <router-link
      :to="link"
    >
      <v-img
        :src="heroImage || require('@/assets/NoImageFound.png')"
        width="500"
        height="250"
      />
    </router-link>
    <v-container class="title">
      <router-link :to="link">
        {{ product.title }}
      </router-link>
      <rating-icons-with-breakdown :product="product"/>
      <router-link :to="link">
        <card-price
          :price="product.price"
          :quantity="product.quantity"
          :list-price="product.list_price"
        />
      </router-link>
    </v-container>
  </v-card>
</template>

<script>
import CardPrice from '@/components/CardPrice'
import RatingIconsWithBreakdown from '@/components/Rating/RatingIconsWithBreakdown'

export default {
  name: 'productCard',
  components: {
    CardPrice,
    RatingIconsWithBreakdown
  },
  props: {
    product: { type: Object, required: true }
  },
  data: function () {
    const link = { name: 'product', params: { title: this.product.title, id: this.product.id } }
    let heroImage = null
    const images = this.product.images
    if (images && images.length > 0) heroImage = images[0].image
    return {
      link,
      heroImage,
      breakdown: null
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
</style>
