export default {
  methods: {
    /**
     * Route the new page and account for duplicate routing (exists to prevent background on buttons with to prop)
     * @param {String} pageName
     */
    routeToPage (pageName) {
      if (this.$route.name !== pageName) this.$router.push({ name: pageName })
    }
  }
}
