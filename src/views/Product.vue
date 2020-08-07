<template>
  <v-skeleton-loader v-if="!product" />
  <div v-else>
    <v-row>
      <v-col cols="auto">
        <image-section :images="product.images"/>
      </v-col>
      <v-col>
        <h1> {{ product.title }} </h1>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ImageSection from '@/components/ImageSection'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',
  components: {
    ImageSection
  },
  computed: {
    ...mapGetters('product', ['product'])
  },
  methods: {
    ...mapActions('product', [
      'getProduct'
    ])
  },
  mounted () {
    this.getProduct(this.$route.params.id)
  }
}
</script>
