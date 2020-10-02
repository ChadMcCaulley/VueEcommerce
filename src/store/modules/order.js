import axios from 'axios'

export default {
  namespaced: true,
  state: {
    order: null,
    orderId: null,
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
    },
    setOrderId (state, id) {
      state.orderId = id
    }
  },
  actions: {
    /**
     * Get the order the user has that hasn't been ordered, one from the cookies, or start a new order
     * @param {Object} commit - access to store setters
     * @param {Object} dispatch - allows actions to be called
     * @param {Object} params
     */
    async getCurrentOrder ({ commit, dispatch }) {
      try {
        await dispatch('syncCookiesDatabase')
        if (window.$cookies.isKey('cart')) {
          const cart = JSON.parse(window.$cookies.get('cart'))
          const ids = cart.map(item => item.productId)
          const res = await axios.get('/api/products/', { params: { id__in: ids.join() } })
          const allProducts = res.data.results
          const products = cart.map(item => {
            const product = allProducts.filter(product => product.id === item.productId)
            return { quantity: item.quantity, product: product[0] }
          })
          commit('setOrder', { products })
        }
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
        // if (rootState.auth.loggedIn) await axios.delete(`/api/order_product/${productId}`)
        const currCart = JSON.parse(window.$cookies.get('cart'))
        const cart = currCart.filter(item => item.productId !== productId)
        window.$cookies.set('cart', JSON.stringify(cart))
        await dispatch('getCurrentOrder')
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
    async addProductToOrder ({ dispatch, commit }, params) {
      try {
        // await dispatch('addItemToOrderDatabase', params)
        dispatch('addItemToOrderCookie', params)
        await dispatch('getCurrentOrder')
        commit('setSnackbar', { message: 'Successfully added to cart', color: 'success' }, { root: true })
      } catch (err) {
        commit('setSnackbar', { message: 'Unable to add product to cart', color: 'error' }, { root: true })
      }
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
        for (let i = 0; i < orders.length && !updated; i++) {
          if (orders[i].productId === params.productId) {
            updated = true
            orders[i] = params
          }
        }
        if (!updated) orders.push(params)
      }
      window.$cookies.set('cart', JSON.stringify(orders))
    },
    /**
     * Update the order in the user's cookies
     * @param {Object} context
     * @param {Object} params - product, quantity
     */
    async addItemToOrderDatabase ({ rootState, state }, params) {
      if (!rootState.auth.loggedIn) return
      const orderProduct = {
        order: state.orderId,
        quantity: params.quantity,
        product: params.productId
      }
      await axios.post('/api/order_products/', orderProduct)
    },
    /**
     * Sync the user's cart in cookies with their cart in the database
     * @param {Object} state - access to store state
     * @param {Object} rootState - access to root state
     * @param {Object} commit - access to store setters
     */
    async syncCookiesDatabase ({ state, rootState, commit }) {
      if (!rootState.auth.loggedIn) return
      try {
        const res = await axios.get('/api/orders/latest/')
        commit('setOrderId', res.data.id)
        const dbCart = res.data.products.map(prod => {
          return {
            productId: prod.product,
            quantity: prod.quantity
          }
        })
        const cookiesCart = JSON.parse(window.$cookies.get('cart'))
        if (!cookiesCart) {
          window.$cookies.set('cart', JSON.stringify(dbCart))
        } else {
        }
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to sync cart with database', color: 'error' }, { root: true })
      }
    }
  }
}
