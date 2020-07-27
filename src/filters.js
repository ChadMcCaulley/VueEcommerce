export default {
  price: (value) => {
    if (!value) return 'N/A'
    return '$' + parseFloat(value).toFixed(2)
  },
  percent: (value) => {
    if (!value) return 'N/A'
    return value + '%'
  }
}
