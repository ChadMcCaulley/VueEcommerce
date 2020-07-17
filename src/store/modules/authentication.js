import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setToken (state, token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`
    },
    setUser (state, user) {
      state.user = user
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
        commit('setToken', res.token)
        commit('setUser', res.user)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to login', color: 'error' }, { root: true })
      }
    }
  }
}
