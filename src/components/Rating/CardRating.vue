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
        @mouseover="$emit('mouseover')"
        v-bind="attrs"
        v-on="on"
      >
        <slot />
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

export default {
  name: 'CardRating',
  components: {
    ProductRating
  },
  props: {
    breakdown: { type: Object, required: false, default: null },
    product: { type: Object, required: true }
  },
  data: () => ({
    ratingMenu: false
  })
}
</script>
