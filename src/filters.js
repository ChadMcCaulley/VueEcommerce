export default {
  price: (value) => {
    if (!value) return 'N/A'
    const correctDecimals = parseFloat(value).toFixed(2)
    return '$' + correctDecimals
  },
  percent: (value) => {
    return Math.floor((parseFloat(value) * 100)) + '%'
  }
}
