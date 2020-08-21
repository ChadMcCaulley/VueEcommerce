<template>
  <v-carousel
    v-if="mobile"
    show-arrows-on-hover
    :height="heroImageSize"
  >
    <v-carousel-item
      v-for="image in images"
      :key="image.id"
      :src="image.image"
      :width="heroImageSize"
    ></v-carousel-item>
  </v-carousel>
  <v-row v-else>
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
      const breakpoint = this.$vuetify.breakpoint
      if (breakpoint.xl) return 600
      if (breakpoint.lg) return 500
      return 400
    },
    mobile () {
      return this.$vuetify.breakpoint.xs
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
