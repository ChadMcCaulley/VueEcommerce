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
        :contain="heroImage"
        width="500"
        height="250"
      />
    </router-link>
    <v-card-title class="mb-0 pb-0 title">
      <router-link :to="link">
        {{ product.title | titleLength }}
      </router-link>
    </v-card-title>
    <card-rating
      :id="product.id"
      :title="product.title"
      :breakdown="breakdown"
    >
      <div
        @mouseover="getBreakdown"
        style="transform-origin: left; transform: scale(0.85)"
        class="d-flex ml-3 my-2"
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
    <v-card-title class="pt-0 mt-0 title">
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
import CardRating from '@/components/CardRating'
import { mapActions } from 'vuex'

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
  },
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
.title {
  font-size: 1.05rem;
  line-height: 1.35;
  word-break: keep-all;
}
.special-atag {
  text-decoration: none;
}
.special-atag:hover {
  text-decoration: underline;
}
</style>
