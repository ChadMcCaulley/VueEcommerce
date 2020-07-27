import Vue from 'vue'
import Vuex from 'vuex'

import authentication from '@/store/modules/authentication'
import product from '@/store/modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      text: null,
      color: 'warning'
    }
  },
  mutations: {
    setSnackbar (state, snackbar) {
      state.snackbar = snackbar
    }
  },
  actions: {
  },
  modules: {
    auth: authentication,
    product
  }
})
