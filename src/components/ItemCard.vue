<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="item.hero_image"
      height="200px"
    />
    <v-card-text>
      {{ item.title }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: { type: Object, required: true }
  }
}
</script>
