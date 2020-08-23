export default {
  methods: {
    /**
     * Route the new page and account for duplicate routing (exists to prevent background on buttons with to prop)
     * @param {String} pageName
     * @param {Object} params
     */
    routeToPage (pageName, params) {
      const route = { name: pageName }
      if (typeof params === 'object') route.params = params
      if (this.$route.name !== pageName) this.$router.push(route)
    },
    /**
     * Get the parent object by one of its key value pairs
     * @param {Array} objects
     * @param {String, Number} value
     * @param {String} key
     */
    getObjByValue (objects, value, key) {
      for (const obj in objects) {
        if (obj[key] === value) return obj
      }
      return null
    }
  }
}
