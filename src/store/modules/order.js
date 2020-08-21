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
          order = JSON.parse(window.$cookies.get('cart'))
        }
        commit('setOrder', order)
      } catch (err) {
        commit('setSnackbar', { message: 'Unable to get your latest order', color: 'error' }, { root: true })
      }
    },
    /**
     * Add the quantity of the given product to an existing order or start a new order
     * @param {Object} context
     * @param {Object} params - product, quantity
     */
    async addProductToOrder ({ commit, dispatch, rootState }, params) {
      try {
        const isLoggedIn = rootState.auth.isLoggedIn
        if (isLoggedIn) dispatch('updateOrderDatabase', { ...params })
        else dispatch('updateOrderCookie', params)
        dispatch('getCurrentOrder')
        commit('setSnackbar', { message: 'Items successfully added to your Order', color: 'success' }, { root: true })
      } catch (err) {
        commit('setSnackbar', { message: 'Unable to add product to order', color: 'error' }, { root: true })
      }
    },
    /**
     * Update the order in the database
     * @param {Object} context
     * @param {Object} params - product, quantity, user
     */
    updateOrderDatabase ({ state }, params) {
      return 'hi'
    },
    /**
     * Update the order in the user's cookies
     * @param {Object} context
     * @param {Object} params - product, quantity
     */
    updateOrderCookie ({ state }, params) {
      const currOrder = state.order
      const newValue = { product: params.product, quantity: params.quantity }
      let orders = [newValue]
      if (currOrder) {
        orders = [...currOrder]
        let updated = false
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].product === params.product) {
            updated = true
            orders[i] = newValue
          }
        }
        if (!updated) orders.push(newValue)
      }
      window.$cookies.set('cart', JSON.stringify(orders))
    }
  }
}
