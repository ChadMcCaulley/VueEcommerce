export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
    }
  },
  actions: {
    /**
     * Log the user into the application if their password and username are in the system
     * @param {Object} commit
     * @param {Object} userInfo
     * @return {Promise} success - true if successful, false if failure
     */
    login ({ commit }, userInfo) {
      try {

      } catch (err) {
        console.log(err)
      }
    }
  }
}
