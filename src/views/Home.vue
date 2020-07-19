<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.id"
        xs="12"
        sm="6"
        md="4"
        lg="3"
      >
        <item-card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    const img = 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
    const items = []
    for (let i = 0; i < 10; i++) {
      const price = Math.random() * 10
      items.push({ id: i, title: 'Boots', price, rating: 3.5, num_ratings: 750, hero_image: img })
    }
    return {
      items
    }
  }
}
</script>
