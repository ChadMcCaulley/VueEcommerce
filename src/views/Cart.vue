<template>
  <div>
    <h1> Shopping Cart </h1>
    <v-skeleton-loader
      v-if="loading"
      type="card"
    />
    <div v-else-if="order && order.products.length > 0">
      <v-sheet>
        <div
          v-for="(item, index) in order.products"
          :key="index"
        >
          <v-row class="mx-4">
            <v-col cols="auto">
              <v-img
                :src="item.product.images[0].image"
                height="120"
                width="120"
              />
            </v-col>
            <v-col class="title">
              <router-link :to="{ name: 'product', params: { title: item.product.title, id: item.product.id } }">
                {{ item.product.title }}
              </router-link>
              <div
                :class="`${stockStatus(item.product).color}--text`"
                style="font-weight: normal"
              >
                {{ stockStatus(item.product).text }}
              </div>
              <div class="d-flex mt-2">
                <v-select
                  v-model="item.quantity"
                  label="Quantity"
                  outlined
                  filled
                  dense
                  style="max-width: 150px; min-width: 75px"
                  hide-details
                  @change="updateCurrentOrder(item)"
                  :loading="updatingOrder"
                  :items="getPossibleQuantities(item.product)"
                />
                <v-divider
                  class="ml-4"
                  vertical
                />
                <v-btn
                  @click="deleteItem(item)"
                  text
                  color="error"
                  :loading="removingItem"
                  :disabled="removingItem"
                >
                  <v-icon> mdi-delete </v-icon> Delete
                </v-btn>
              </div>
            </v-col>
            <v-col cols="auto">
              <div class="title">
                {{ item.product.price | price }}
              </div>
            </v-col>
          </v-row>
        </div>
        <v-divider />
        <div class="text-end mr-4 py-4 title">
          Subtotal ({{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}): {{ totalPrice | price }}
        </div>
      </v-sheet>
      <div class="mt-2 text-right">
        <v-btn
          color="success"
        >
          Proceed to Checkout
        </v-btn>
      </div>
    </div>
    <v-sheet v-else>
      <h3 class="text-center py-4">
        No Items Found in Cart
      </h3>
    </v-sheet>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      order: 'order/order'
    }),
    totalItems () {
      return this.order.products.reduce((accu, item) => {
        return accu + item.quantity
      }, 0)
    },
    totalPrice () {
      return this.order.products.reduce((accu, item) => {
        return accu + (parseFloat(item.quantity) * parseFloat(item.product.price))
      }, 0)
    }
  },
  data: () => ({
    loading: true,
    updatingOrder: false,
    removingItem: false
  }),
  methods: {
    ...mapActions({
      getCurrentOrder: 'order/getCurrentOrder',
      addProductToOrder: 'order/addProductToOrder',
      removeItemFromOrder: 'order/removeItemFromOrder'
    }),
    /**
     * Get the status text and color for the product in_stock status
     * @param {Object} product
     */
    stockStatus (product) {
      return product.in_stock ? { text: 'In Stock', color: 'success' } : { text: 'Out of Stock', color: 'error' }
    },
    /**
     * Get all possible quantities for a given product based on its inventory
     * @param {Object} product
     */
    getPossibleQuantities (product) {
      const max = Math.min(30, product.inventory)
      return new Array(max).fill(0).map((v, i) => i + 1)
    },
    /**
     * Update the item that has been changed
     * @param {Object} item
     */
    updateCurrentOrder (item) {
      this.updatingOrder = true
      const params = { productId: item.product.id, quantity: item.quantity }
      this.addProductToOrder(params).then(() => {
        this.updatingOrder = false
      })
    },
    /**
     * Delete the item from the order
     * @param {Object} item
     */
    deleteItem (item) {
      this.removingItem = true
      this.removeItemFromOrder(item.product.id).then(() => {
        this.removingItem = false
      })
    }
  },
  mounted () {
    this.getCurrentOrder().then(() => {
      this.loading = false
    })
  }
}
</script>
