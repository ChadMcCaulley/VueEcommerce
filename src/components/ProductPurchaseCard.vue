<template>
  <v-card width="100%" min-width="250px">
    <v-container class="card-container">
      <h3 class="primary--text"> {{ product.price | price }} </h3>
      <h3 :class="`${stockStatus.color}--text my-4`"> {{ stockStatus.text }} </h3>
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
    quantity: 1
  })
}
</script>

<style scoped>
h3 {
  font-weight: normal;
}
</style>
