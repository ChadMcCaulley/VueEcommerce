<template>
  <div>
    <v-list-item-content>
      <div>
        <v-icon size="30"> mdi-account-circle </v-icon>
        {{ review.user.username }}
      </div>
      <h1
        class="d-flex align-center review-title"
      >
        <rating-icons
          :rating="review.rating"
          class="rating-icons"
        />
        {{ review.title }}
      </h1>
      <p>
        {{ review.message }}
      </p>
    </v-list-item-content>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    review: { type: Object, required: true }
  }
}
</script>

<style lang="scss" scoped>
.review-title {
  font-weight: bold;
  font-size: 1.1rem;
}
.rating-icons {
  transform-origin: left;
  transform: scale(0.9);
}
</style>
