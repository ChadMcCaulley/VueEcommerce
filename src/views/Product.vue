<template>
  <div>
    <image-section :images="[
      'https://images.unsplash.com/photo-1583213773181-435a1ab75502?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1226&q=80',
      'https://images.unsplash.com/photo-1585825228520-91eb348cf0b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
      'https://images.unsplash.com/photo-1534534110269-583d430e0038?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
    ]"/>
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
