<template>
  <v-row>
    <v-col cols="auto">
      <v-img
        v-for="image in images"
        :key="image.id"
        :src="image.image"
        contain
        width="60"
        height="60"
        class="mb-2 image-preview"
        @mouseover="changeHeroImage(image.image)"
        :input-value="true"
      />
    </v-col>
    <v-col>
      <v-img
        :src="heroImage"
        contain
        width="300"
        height="300"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ImageSection',
  props: {
    images: { type: Array, required: true }
  },
  data: function () {
    const heroImage = this.images[0].image
    return {
      heroImage
    }
  },
  methods: {
    /**
     * Change the hero image
     * @param {String} imageSrc
     */
    changeHeroImage (imageSrc) {
      this.heroImage = imageSrc
    }
  }
}
</script>

<style scoped lang="scss">
.image-preview {
  border: 1px solid black;
  &:hover,
  &:active {
    cursor: pointer;
    box-shadow: 0px 0px 4px 2px var(--v-primary-base);
  }
}
</style>
