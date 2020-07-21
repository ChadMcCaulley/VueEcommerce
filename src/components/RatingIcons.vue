<template>
  <div>
    <v-icon
      v-for="(icon, i) in starIcons"
      :key="i"
      color="rating"
    >
      {{ icon }}
    </v-icon>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RatingIcons',
  props: {
    rating: { type: Number, required: true }
  },
  data: function () {
    let fullStars = Math.floor(this.rating)
    let halfStars = Math.ceil(this.rating - fullStars)
    const starIcons = new Array(5).fill(0).map(() => {
      if (fullStars > 0) {
        fullStars--
        return 'mdi-star'
      } else if (halfStars > 0) {
        halfStars--
        return 'mdi-star-half-full'
      } else return 'mdi-star-outline'
    })
    return {
      starIcons
    }
  }
}
</script>
