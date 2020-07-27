import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    productsPerPage: 20,
    totalProducts: 0
  },
  getters: {
    products (state) { return state.products },
    totalProducts (state) { return state.totalProducts }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    setTotalProducts (state, totalProducts) {
      state.totalProducts = totalProducts
    }
  },
  actions: {
    /**
     * Get the next page of products with optional params
     * @param {Object} context
     * @param {Object} params
     */
    async getProducts ({ commit, state }, params) {
      try {
        const res = await axios.get('/api/item_variants/', { params })
        commit('setProducts', res.data.results)
        commit('setTotalProducts', Math.floor(res.data.count / state.productsPerPage))
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to get products', color: 'error' }, { root: true })
      }
    }
  }
}
