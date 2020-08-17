import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    productsPerPage: 20,
    totalProducts: 0,
    product: null
  },
  getters: {
    products (state) { return state.products },
    productsPerPage (state) { return state.productsPerPage },
    totalProducts (state) { return state.totalProducts },
    product (state) { return state.product }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    setTotalProducts (state, totalProducts) {
      state.totalProducts = totalProducts
    },
    setProduct (state, product) {
      state.product = product
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
        const res = await axios.get('/api/products/', { params })
        commit('setProducts', res.data.results)
        commit('setTotalProducts', Math.floor(res.data.count / state.productsPerPage))
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to get products', color: 'error' }, { root: true })
      }
    },
    /**
     * Get the next page of products with optional params
     * @param {Object} context
     * @param {String} id
     */
    async getProduct ({ commit }, id) {
      try {
        const res = await axios.get(`/api/products/${id}/`)
        commit('setProduct', res.data)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to get the product', color: 'error' }, { root: true })
      }
    },
    /**
     * Get the breakdown for the current product's reviews
     * @param {Object} context
     * @param {String} id
     */
    async getRatingBreakdown ({ commit }, id) {
      try {
        const res = await axios.get(`/api/products/${id}/rating_breakdown/`)
        return res.data
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to get reviews', color: 'error' }, { root: true })
      }
    }
  }
}
