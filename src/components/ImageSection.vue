<template>
  <v-row>
    <v-col
      cols="auto"
      class="pr-0"
    >
      <v-img
        v-for="image in images"
        :key="image.id"
        :src="image.image"
        width="60"
        height="60"
        :class="image === heroImage ? 'active-image mb-2 image-preview' : 'mb-2 image-preview'"
        @mouseover="changeHeroImage(image)"
        :input-value="true"
      />
    </v-col>
    <v-col>
      <v-img
        :src="heroImage.image"
        :width="heroImageSize"
        :height="heroImageSize"
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
  computed: {
    heroImageSize () {
      if (this.$vuetify.breakpoint.xl) return 600
      if (this.$vuetify.breakpoint.lg) return 500
      if (this.$vuetify.breakpoint.md) return 400
      return 300
    }
  },
  data: function () {
    const heroImage = this.images[0]
    return {
      heroImage
    }
  },
  watch: {
    images () {
      this.heroImage = this.images[0]
    }
  },
  methods: {
    /**
     * Change the hero image
     * @param {Object} image
     */
    changeHeroImage (image) {
      this.heroImage = image
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
.active-image {
  box-shadow: 0px 0px 4px 2px var(--v-primary-base);
}
</style>
