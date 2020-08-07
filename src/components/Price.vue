<template>
  <div class="d-flex">
    {{ wholeValue | price }}
    <span class="cents"> {{ decimalValue }} </span>
  </div>
</template>

<script>
export default {
  name: 'Price',
  props: {
    price: { type: [String, Number], required: true }
  },
  data: function () {
    const priceArr = (this.price + '').split('.')
    const wholeValue = priceArr[0]
    let decimalValue = null
    if (priceArr.length > 1) decimalValue = priceArr[1]
    return {
      wholeValue,
      decimalValue
    }
  }
}
</script>

<style>
.cents {
  vertical-align: super;
  font-size: 0.9rem;
}
</style>
