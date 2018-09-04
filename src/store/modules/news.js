import slugify from 'slugify'

const state = {
  expires: null,
  news: []
}

const mutations = {
  SAVE_NEWS (state, data) {
    state.expires = new Date().getTime() + 3600000
    state.news = data
  },
  FLUSH_NEWS (state) {
    state.expires = null
    state.news = []
  }
}

/**
 * Vuex Actions
 * @example this.$store.getters.getNewsArticles
 */
const getters = {
  getNewsArticle: (state) => (key) => {
    for (let i = 0; i < state.news.length; i++) {
      let slug = slugify(state.news[i].title, {
        replacement: '-',
        lower: true
      })

      if (slug === key) {
        return state.news[i]
      }
    }

    return null
  },
  getNewsArticles: state => {
    const currentTime = new Date().getTime()

    // Check if last cache is more than an hour old
    return (state.expires - currentTime > 0) ? state.news : null
  }
}

/**
 * Vuex Actions
 * @example this.$store.dispatch('saveNews', data)
 */
const actions = {
  saveNews ({ commit }, data) {
    commit('SAVE_NEWS', data)
  },
  flushNews ({ commit }) {
    commit('FLUSH_NEWS')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
