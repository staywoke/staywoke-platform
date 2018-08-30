const state = {
  expires: null,
  featured: []
}

const mutations = {
  SAVE_FEATURED (state, data) {
    state.expires = new Date().getTime() + 3600000
    state.featured = data
  },
  FLUSH_FEATURED (state, data) {
    state.expires = null
    state.featured = []
  }
}

/**
 * Vuex Actions
 * @example this.$store.getters.getFeaturedContent
 */
const getters = {
  getFeaturedContent: state => {
    const currentTime = new Date().getTime()

    // Check if last cache is more than an hour old
    return (state.expires - currentTime > 0) ? state.featured : null
  }
}

/**
 * Vuex Actions
 * @example this.$store.dispatch('saveFeatured', data)
 */
const actions = {
  saveFeatured ({ commit }, data) {
    commit('SAVE_FEATURED', data)
  },
  flushFeatured ({ commit }, data) {
    commit('FLUSH_FEATURED', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
