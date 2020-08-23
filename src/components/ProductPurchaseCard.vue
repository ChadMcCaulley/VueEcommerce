<template>
  <v-card min-width="150px" max-width="250px">
    <v-container class="card-container title">
      <div class="primary--text"> {{ product.price | price }} </div>
      <div
        :class="`${stockStatus.color}--text mb-4 mt-2`"
        style="font-weight: normal"
      >
        {{ stockStatus.text }}
      </div>
      <div v-if="product.in_stock">
        <v-select
          v-model="quantity"
          label="Quantity"
          outlined
          filled
          dense
          :items="possibleQuantities"
        />
        <v-btn
          color="rating"
          class="mb-2"
          block
          :loading="loading"
          :disabled="loading"
          @click="addToCart"
        >
          <v-icon class="mr-auto">mdi-cart</v-icon> <div class="mx-auto">Add To Cart</div>
        </v-btn>
        <v-btn
          color="secondary"
          block
        >
          <v-icon class="mr-auto">mdi-play</v-icon> <div class="mx-auto">Buy Now</div>
        </v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductPurchaseCard',
  props: {
    product: { type: Object, required: true }
  },
  computed: {
    stockStatus () {
      const inStock = this.product.in_stock
      return inStock ? { text: 'In Stock', color: 'success' } : { text: 'Out of Stock', color: 'error' }
    },
    possibleQuantities () {
      const max = Math.min(30, this.product.inventory)
      return new Array(max).fill(0).map((v, i) => i + 1)
    }
  },
  data: () => ({
    quantity: 1,
    loading: false
  }),
  methods: {
    ...mapActions({
      addProductToOrder: 'order/addProductToOrder'
    }),
    addToCart () {
      this.loading = true
      const params = { productId: this.product.id, quantity: this.quantity }
      this.addProductToOrder(params).then(() => {
        this.loading = false
      })
    }
  }
}
</script>
