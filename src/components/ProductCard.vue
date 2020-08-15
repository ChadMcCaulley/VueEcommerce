<template>
  <v-card
    width="500"
    height="475"
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
    <v-card-title class="mb-0 pb-0 title">
      <router-link :to="link">
        {{ product.title | titleLength }}
      </router-link>
      <rating-icons-with-breakdown
        :product="product"
        class="ml-3"
      />
      <router-link :to="link">
        <card-price
          :price="product.price"
          :quantity="product.quantity"
          :list-price="product.list_price"
        />
      </router-link>
    </v-card-title>
  </v-card>
</template>

<script>
import CardPrice from '@/components/CardPrice'
import RatingIconsWithBreakdown from '@/components/RatingIconsWithBreakdown'

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
  },
  filters: {
    titleLength (title) {
      if (!title) return 'N/A'
      let limitedTitle = title.substring(0, 50)
      if (limitedTitle.length < title.length) limitedTitle += '...'
      return limitedTitle
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
.title {
  font-size: 1.05rem;
  line-height: 1.35;
  word-break: keep-all;
}
</style>
