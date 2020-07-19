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
    setUser (state, data) {
      state.user = data.user
      state.loggedIn = true
    },
    setRefreshToken (state, token) {
      window.$cookies.set('refresh-token', token)
    },
    setAccessToken (state, token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`
    }
  },
  actions: {
    /**
     * Log the user into the application if their password and username are in the system
     * @param {Object} commit
     * @param {Object} userInfo
     */
    async login ({ commit }, userInfo) {
      try {
        const res = await axios.post('/api/auth/login/', userInfo)
        const data = res.data
        commit('setUser', data)
        commit('setRefreshToken', data.refresh_token)
        commit('setAccessToken', data.access_token)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to login', color: 'error' }, { root: true })
      }
    },
    /**
     * If the user has a token, try to refresh it
     * @param {Object} commit
     */
    async refreshToken ({ commit }) {
      try {
        const token = window.$cookies.get('refresh-token')
        const tokenRes = await axios.post('/api/auth/token/refresh/', { refresh: token })
        commit('setRefreshToken', tokenRes.data.refresh)
        commit('setAccessToken', tokenRes.data.access)
        const userRes = await axios.get('/api/auth/user/')
        commit('setUser', userRes.data)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to login', color: 'error' }, { root: true })
      }
    }
  }
}
