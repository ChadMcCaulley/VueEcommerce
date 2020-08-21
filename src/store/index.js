import Vue from 'vue'
import Vuex from 'vuex'

import authentication from '@/store/modules/authentication'
import product from '@/store/modules/product'
import order from '@/store/modules/order'
import review from '@/store/modules/review'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      text: null,
      color: 'warning'
    },
    loading: false
  },
  mutations: {
    setSnackbar (state, snackbar) {
      state.snackbar = snackbar
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },
  actions: {
  },
  modules: {
    auth: authentication,
    product,
    order,
    review
  }
})
