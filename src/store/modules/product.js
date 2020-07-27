import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    products (state) { return state.products }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    /**
     * Get the next page of products with optional params
     * @param {Object} context
     * @param {Object} params
     */
    async getProducts ({ commit }, params) {
      try {
        const res = await axios.get('/api/item_variants/', params)
        commit('setProducts', res.data.results)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to get products', color: 'error' }, { root: true })
      }
    }
  }
}
