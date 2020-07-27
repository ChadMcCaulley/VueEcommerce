<template>
  <div class="d-flex">
    {{ price | price }}
    <div
      v-if="quantity > 1 || listPrice"
      style="font-size: .9rem; color: #444;"
      class="ml-1 my-auto"
    >
      <span v-if="quantity > 1"> ({{ (price/quantity) | price }}/Item) </span>
      <span
        v-if="listPrice"
        style="text-decoration: line-through;"
      >
        {{ listPrice | price }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPrice',
  props: {
    price: { type: [Number, String], required: true },
    quantity: { type: Number, required: false, default: null },
    listPrice: { type: [Number, String], required: false, default: null }
  }
}
</script>
