<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        sm="6"
        md="4"
        lg="3"
        xl="3"
      >
        <product-card :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({ products: 'product/products' })
  },
  methods: {
    ...mapActions({ getProducts: 'product/getProducts' })
  },
  mounted () {
    this.getProducts()
  }
}
</script>
