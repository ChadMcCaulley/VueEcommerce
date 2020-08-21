<template>
  <div>
    <h1> Shopping Cart </h1>
    <v-sheet
      v-for="item in order"
      :key="item.product.id"
    >
      <v-row class="mx-4">
        <v-col cols="auto">
        <v-img
          :src="item.product.images[0].image"
          height="100"
          width="100"
        />
        </v-col>
        <v-col>
          <router-link
            :to="{ name: 'product', params: { title: item.product.title, id: item.product.id } }"
            class="title"
          >
            {{ item.product.title }}
          </router-link>
        </v-col>
        <v-col cols="auto">
          <div class="title">
            {{ item.product.price | price }}
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      order: 'order/order'
    })
  }
}
</script>
