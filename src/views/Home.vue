<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.id"
        sm="6"
        md="4"
        lg="3"
        xl="3"
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
    const itemValues = [
      {
        name: "Nike Air Force 1 Mid '07'",
        src: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
      },
      {
        name: 'Ceramic Coffee Cup',
        src: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
      },
      {
        name: 'USB 3.0 A to A Male Cable 3Ft,USB to USB Cable USB Male to Male Cable Double End USB Cord with Gold-Plated Connector for Hard Drive Enclosures, DVD Player, Laptop Cooler (3Ft/1M)',
        src: 'https://images.unsplash.com/photo-1492107376256-4026437926cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
      },
      {
        name: 'Headphones',
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
      }
    ]
    const items = []
    for (let i = 0; i < 20; i++) {
      const item = itemValues[Math.floor(Math.random() * 4)]
      const price = Math.random() * 10
      const rating = parseFloat((Math.random() * 5).toFixed(1))
      const numRatings = Math.ceil(Math.random() * 100)
      items.push({ id: i, title: item.name, price, rating, num_ratings: numRatings, hero_image: item.src, list_price: price + 1, per_item_price: price / 3 })
    }
    return {
      items
    }
  }
}
</script>
