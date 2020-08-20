import axios from 'axios'

export default {
  namespaced: true,
  state: {
    reviews: [],
    reviewsPerPage: 20,
    totalReviews: 0,
    numStars: null
  },
  getters: {
    reviews (state) { return state.reviews },
    reviewsPerPage (state) { return state.reviewsPerPage },
    totalreviews (state) { return state.totalreviews },
    review (state) { return state.review },
    numStars (state) { return state.numStars }
  },
  mutations: {
    setReviews (state, reviews) {
      state.reviews = reviews
    },
    setTotalReviews (state, totalreviews) {
      state.totalreviews = totalreviews
    },
    setReview (state, review) {
      state.review = review
    },
    setNumStars (state, numStars) {
      state.numStars = numStars
    }
  },
  actions: {
    /**
     * Get the next page of reviews for a given product and page
     * @param {Object} context
     * @param {Object} params
     */
    async getProductReviews ({ commit, state }, params) {
      try {
        let page = 1
        if ('page' in params) page = params.page
        const res = await axios.get('/api/reviews/', { params: { page, product__id: params.productId } })
        commit('setReviews', res.data.results)
        commit('setTotalReviews', Math.floor(res.data.count / state.reviewsPerPage))
      } catch (err) {
        commit('setSnackbar', { message: 'Failed to get reviews', color: 'error' }, { root: true })
      }
    }
  }
}
