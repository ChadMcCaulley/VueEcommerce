import axios from 'axios'

export default {
  namespaced: true,
  state: {
    order: null,
    orders: [],
    ordersPerPage: 20
  },
  getters: {
    order (state) { return state.order },
    orders (state) { return state.orders },
    ordersPerPage (state) { return state.ordersPerPage }
  },
  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    },
    setOrder (state, order) {
      state.order = order
    }
  },
  actions: {
    /**
     * Get the order the user has that hasn't been ordered, one from the cookies, or start a new order
     * @param {Object} context
     * @param {Object} params
     */
    async getCurrentOrder ({ commit, rootState }) {
      try {
        const user = rootState.auth.user
        const isLoggedIn = rootState.auth.isLoggedIn
        let order = null
        if (user && isLoggedIn) {
          const res = await axios.get('/api/orders/', { user__id: user.id, ordered: false })
          order = res.data.result[0]
        } else if (window.$cookies.isKey('cart')) {
          const cart = JSON.parse(window.$cookies.get('cart'))
          const ids = cart.map(item => item.productId)
          const res = await axios.get('/api/products/', { params: { id__in: ids.join() } })
          const allProducts = res.data.results
          const products = cart.map(item => {
            const product = allProducts.filter(product => product.id === item.productId)
            return { quantity: item.quantity, product: product[0] }
          })
          order = { products }
        }
        commit('setOrder', order)
      } catch (err) {
        commit('setSnackbar', { message: 'Unable to get your latest order', color: 'error' }, { root: true })
      }
    },
    /**
     * Add the quantity of the given product to an existing order or start a new order
     * @param {Object} context
     * @param {String} productId
     */
    async removeItemFromOrder ({ commit, dispatch, rootState }, productId) {
      try {
        const isLoggedIn = rootState.auth.isLoggedIn
        if (isLoggedIn) {
          await axios.delete(`/api/order_product/${productId}`)
        } else {
          const currCart = JSON.parse(window.$cookies.get('cart'))
          const cart = currCart.filter(item => item.productId !== productId)
          window.$cookies.set('cart', JSON.stringify(cart))
        }
        dispatch('getCurrentOrder')
        commit('setSnackbar', { message: 'Successfully removed item from cart', color: 'success' }, { root: true })
      } catch (err) {
        commit('setSnackbar', { message: 'Unable to remove item from cart', color: 'error' }, { root: true })
      }
    },
    /**
     * Add the quantity of the given product to an existing order or start a new order
     * @param {Object} context
     * @param {Object} params - product, quantity
     */
    async addProductToOrder ({ commit, dispatch, rootState }, params) {
      try {
        if (!('productId' in params)) throw new Error('Invalid Item')
        const isLoggedIn = rootState.auth.isLoggedIn
        if (isLoggedIn) await dispatch('addItemToOrderDatabase', params)
        else dispatch('addItemToOrderCookie', params)
        dispatch('getCurrentOrder')
        commit('setSnackbar', { message: 'Items successfully added to your cart', color: 'success' }, { root: true })
      } catch (err) {
        commit('setSnackbar', { message: 'Unable to add product to cart', color: 'error' }, { root: true })
      }
    },
    /**
     * Update the order in the database
     * @param {Object} context
     * @param {Object} params - product, quantity, user
     */
    async addItemToOrderDatabase ({ state }, params) {
      // const product = await axios.get(`/api/products/${params.productId}`)
    },
    /**
     * Update the order in the user's cookies
     * @param {Object} context
     * @param {Object} params - product, quantity
     */
    addItemToOrderCookie ({ state }, params) {
      let orders = [params]
      if (window.$cookies.isKey('cart')) {
        orders = JSON.parse(window.$cookies.get('cart'))
        let updated = false
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].productId === params.productId) {
            updated = true
            orders[i] = params
          }
        }
        if (!updated) orders.push(params)
      }
      window.$cookies.set('cart', JSON.stringify(orders))
    }
  }
}
