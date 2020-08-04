<template>
  <div class="d-flex align-center my-2">
    {{ numStars }} star
    <v-progress-linear
      :value="percent * 100"
      background-color="#ccc"
      background-opacity="0.5"
      height="18"
      color="rating"
      class="mx-2 progress-bar"
    />
    {{ percent | percent }}
  </div>
</template>

<script>
export default {
  name: 'RatingPercent',
  props: {
    numStars: { type: String, required: true },
    percent: { type: [Number, String], required: true }
  }
}
</script>

<style>
.progress-bar {
  max-width: 180px;
}
</style>
