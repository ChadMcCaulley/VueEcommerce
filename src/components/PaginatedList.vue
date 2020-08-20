<template>
  <div>
    <slot
      v-if="loading"
      name="loader"
      :entitiesPerPage="entitiesPerPage"
    />
    <slot
      v-else
      :entities="entities"
    />
    <v-pagination
      v-if="totalPages > 1"
      v-model="page"
      @input="getEntities"
      :length="totalPages"
      :total-visible="totalVisable"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'PaginatedList',
  props: {
    url: { type: String, required: true },
    entityName: { type: String, required: true },
    params: { type: Object, required: false, default: null },
    entitiesPerPage: { type: Number, required: false, default: 20 }
  },
  computed: {
    totalVisable () {
      if (this.$vuetify.breakpoint.xs) return 5
      if (this.$vuetify.breakpoint.sm) return 10
      if (this.$vuetify.breakpoint.md) return 15
      return 20
    },
    totalPages () {
      return Math.ceil(this.totalEntities / this.entitiesPerPage)
    }
  },
  watch: {
    params () {
      this.getEntities()
    }
  },
  data: () => ({
    entities: [],
    totalEntities: 0,
    loading: true,
    page: 1
  }),
  methods: {
    ...mapMutations([
      'setSnackbar'
    ]),
    async getEntities () {
      this.loading = true
      try {
        const params = { ...this.params, page: this.page }
        const res = await axios.get(this.url, { params })
        this.entities = res.data.results
        this.totalEntities = res.data.count
      } catch (err) {
        this.setSnackbar({ message: `Failed to get ${this.entityName}`, color: 'error' })
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.getEntities()
  }
}
</script>
