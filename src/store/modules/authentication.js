import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null,
    loggedIn: false
  },
  getters: {
    loggedIn (state) { return state.loggedIn },
    user (state) { return state.user }
  },
  mutations: {
    setAccessToken (state, token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`
    },
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    setRefreshToken (state, token) {
      window.$cookies.set('refresh-token', token, '', true)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    /**
     * Log the user into the application if their password and username are in the system
     * @param {Object} context
     * @param {Object} userInfo
     */
    async login ({ commit, dispatch }, userInfo) {
      try {
        const res = await axios.post('/auth/login/', userInfo)
        dispatch('setLoggedInValues', res.data)
        await dispatch('order/getCurrentOrder', { root: true })
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to log in', color: 'error' }, { root: true })
      }
    },
    /**
     * Log the user out of the system
     * @param {Object} commit
     */
    async logOut ({ commit }) {
      try {
        await axios.post('/auth/logout/')
        commit('setRefreshToken', null)
        commit('setUser', null)
        commit('setLoggedIn', false)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to log out', color: 'error' }, { root: true })
      }
    },
    /**
     * If the user has a token, try to refresh it
     * @param {Object} commit
     */
    async refreshToken ({ commit }) {
      try {
        const token = window.$cookies.get('refresh-token')
        if (!token || token === 'null') return
        const tokenRes = await axios.post('/auth/token/refresh/', { refresh: token })
        commit('setRefreshToken', tokenRes.data.refresh)
        commit('setAccessToken', tokenRes.data.access)
        const userRes = await axios.get('/auth/user/')
        commit('setUser', userRes.data)
        commit('setLoggedIn', true)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to log in', color: 'error' }, { root: true })
      }
    },
    /**
     * Register a new user
     * @param {Object} context
     * @param {Object} newUser
     */
    async registration ({ commit, dispatch }, newUser) {
      try {
        const res = await axios.post('/auth/registration/', newUser)
        dispatch('setLoggedInValues', res.data)
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to log in', color: 'error' }, { root: true })
      }
    },
    /**
     * Set the user, tokens, and logged in
     * @param {Object} commit
     * @param {Object} data
     */
    setLoggedInValues ({ commit }, data) {
      commit('setUser', data.user)
      commit('setRefreshToken', data.refresh_token)
      commit('setAccessToken', data.access_token)
      commit('setLoggedIn', true)
    }
  }
}
