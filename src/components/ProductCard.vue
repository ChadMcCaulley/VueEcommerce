<template>
  <v-card
    class="mx-auto"
    width="500"
    height="475"
  >
    <router-link
      :to="link"
    >
      <v-img
        :src="product.hero_image || require('@/assets/NoImageFound.png')"
        width="500"
        height="300"
      />
    </router-link>
    <v-card-title class="mb-0 pb-0 title">
      <router-link :to="link">
        {{ product.title | titleLength }}
      </router-link>
    </v-card-title>
    <card-rating
      class="ml-3 my-2"
      :num-ratings="product.num_ratings"
      :rating="product.rating"
      :id="product.id"
      :title="product.title"
    />
    <v-card-title class="pt-0 mt-0 title">
      <router-link
        :to="link"
      >
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
import CardRating from '@/components/CardRating'

export default {
  name: 'productCard',
  components: {
    CardPrice,
    CardRating
  },
  props: {
    product: { type: Object, required: true }
  },
  data: function () {
    const link = { name: 'product', params: { title: this.product.title, id: this.product.id } }
    return {
      link
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
