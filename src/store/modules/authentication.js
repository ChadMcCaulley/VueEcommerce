import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null,
    loggedIn: false
  },
  getters: {
    loggedIn (state) { return state.loggedIn }
  },
  mutations: {
    setUser (state, res) {
      axios.defaults.headers.Authorization = `Bearer ${res.token}`
      state.user = res.user
      state.loggedIn = true
    }
  },
  actions: {
    /**
     * Log the user into the application if their password and username are in the system
     * @param {Object} commit
     * @param {Object} userInfo
     * @return {Promise} success - true if successful, false if failure
     */
    async login ({ commit }, userInfo) {
      try {
        const res = await axios.post('/api/auth/login/', userInfo)
        commit('setUser', res)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to login', color: 'error' }, { root: true })
      }
    }
  }
}
