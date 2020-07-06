import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = {
        username: user.username,
        email: user.email
      }
      axios.defaults.headers.common.Authorization = user.token
    }
  },
  actions: {
    /**
     * Log the user into the server using
     * @param {Object} commit - access to mutations
     * @param {Object} params - {username: string, password: string}
     */
    async logIn ({ commit }, params) {
      try {
        const res = await axios.post('/api/token-auth/', params)
        commit('setUser', res.data)
      } catch (err) {
      }
    }
  }
}
