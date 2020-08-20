export default {
  methods: {
    /**
     * Route the new page and account for duplicate routing (exists to prevent background on buttons with to prop)
     * @param {String} pageName
     * @param {Object} params
     * @param {Object} props
     */
    routeToPage (pageName, params) {
      const route = { name: pageName }
      if (typeof params === 'object') route.params = params
      if (this.$route.name !== pageName) this.$router.push(route)
    }
  }
}
