export default {
  price: (value) => {
    if (!value) return 'N/A'
    return '$' + value
  },
  percent: (value) => {
    return Math.floor((parseFloat(value) * 100)) + '%'
  }
}
