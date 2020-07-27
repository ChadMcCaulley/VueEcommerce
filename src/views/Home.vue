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
    <v-pagination
      v-model="page"
      @input="getProductByPage"
      :length="totalProducts"
      :total-visible="totalVisable"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    page: 1
  }),
  computed: {
    ...mapGetters('product', [
      'products',
      'totalProducts'
    ]),
    totalVisable () {
      if (this.$vuetify.breakpoint.xs) return 5
      if (this.$vuetify.breakpoint.sm) return 10
      if (this.$vuetify.breakpoint.md) return 15
      return 20
    }
  },
  methods: {
    ...mapActions({ getProducts: 'product/getProducts' }),
    /**
     * Get the next set of products based on their page
     */
    getProductByPage () {
      const params = {
        page: this.page
      }
      this.getProducts(params).then(() => {})
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
