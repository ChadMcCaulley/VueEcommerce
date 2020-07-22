<template>
  <div class="d-flex">
    {{ price | price }}
    <div
      v-if="perItemPrice || originalPrice"
      style="font-size: .9rem; color: #444;"
      class="ml-1 my-auto"
    >
      <span v-if="perItemPrice"> ({{ perItemPrice | price }}/Item) </span>
      <span
        v-if="originalPrice"
        style="text-decoration: line-through;"
      >
        {{ originalPrice | price }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPrice',
  props: {
    price: { type: Number, required: true },
    perItemPrice: { type: Number, required: false, default: null },
    originalPrice: { type: Number, required: false, default: null }
  }
}
</script>
