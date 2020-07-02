import axios from 'axios'

export default {
  namespaced: true,
  state: {
    loggedIn: false
  },
  mutations: {
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
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
        const res = await axios.post('/auth/token-auth/', params)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
