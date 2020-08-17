<template>
  <div class="d-flex align-center my-2 rating-percent">
    {{ numStars }} star
    <v-progress-linear
      :value="percent * 100"
      background-color="#ddd"
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

<style lang="scss">
.progress-bar {
  max-width: 180px;
  border: #aaa solid 1px;
  border-radius: 3px;
  box-shadow: 2px 3px 6px 0px rgba(0,0,0,0.25);
  &:hover {
    box-shadow: 4px 5px 6px 0px rgba(0,0,0,0.25);
  }
}
</style>
