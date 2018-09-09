const state = {
  expires: null,
  news: []
}

const mutations = {
  ARTICLE_READ (state, data) {
    for (let i = 0; i < state.news.length; i++) {
      if (state.news[i].slug === data.slug) {
        state.news[i].read = new Date().getTime()
        break
      }
    }
  },
  SAVE_ARTICLE (state, data) {
    let found = false
    for (let i = 0; i < state.news.length; i++) {
      if (state.news[i].slug === data.slug) {
        found = true
        break
      }
    }

    if (!found) {
      state.news.push(data)

      if (!state.expires) {
        state.expires = new Date().getTime() + 3600000
      }
    }
  },
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
      if (state.news[i].slug === key) {
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
  markArticleRead ({ commit }, data) {
    commit('ARTICLE_READ', data)
  },
  saveArticle ({ commit }, data) {
    commit('SAVE_ARTICLE', data)
  },
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
