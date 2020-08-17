export default {
  data: () => ({
    window: { width: 0, height: 0 }
  }),
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      const newWindow = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      this.window = newWindow
    }
  }
}
