<template>
  <v-card
    class="mx-auto"
    width="500"
    height="475"
  >
    <router-link
      :to="link"
    >
      <v-img
        :src="item.hero_image"
        width="500"
        height="300"
      />
    </router-link>
    <v-card-title class="mb-0 pb-0 title">
      <router-link :to="link">
        {{ item.title | titleLength }}
      </router-link>
    </v-card-title>
    <card-rating
      class="ml-3 my-2"
      :num-ratings="item.num_ratings"
      :rating="item.rating"
      :id="item.id"
      :title="item.title"
    />
    <v-card-title class="pt-0 mt-0 title">
      <router-link
        :to="link"
      >
        <card-price
          :price="item.price"
          :per-item-price="item.per_item_price"
          :original-price="item.list_price"
        />
      </router-link>
    </v-card-title>
  </v-card>
</template>

<script>
import CardPrice from '@/components/CardPrice'
import CardRating from '@/components/CardRating'

export default {
  name: 'ItemCard',
  components: {
    CardPrice,
    CardRating
  },
  props: {
    item: { type: Object, required: true }
  },
  data: function () {
    const link = { name: 'item', params: { title: this.item.title, id: this.item.id } }
    return {
      link
    }
  },
  filters: {
    titleLength (title) {
      if (!title) return 'N/A'
      let limitedTitle = title.substring(0, 50)
      if (limitedTitle.length < title.length) limitedTitle += '...'
      return limitedTitle
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  color: var(--v-primary-base) !important;
}
.title {
  font-size: 1.05rem;
  line-height: 1.35;
  word-break: keep-all;
}
</style>
