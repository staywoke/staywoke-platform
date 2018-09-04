import slugify from 'slugify'

const state = {
  expires: null,
  actions: []
}

const mutations = {
  SAVE_LATEST_ACTIONS (state, data) {
    state.expires = new Date().getTime() + 3600000
    state.actions = data
  },
  FLUSH_LATEST_ACTIONS (state) {
    state.expires = null
    state.actions = []
  }
}

/**
 * Vuex Actions
 * @example this.$store.getters.getLatestActions
 */
const getters = {
  getLatestAction: (state) => (key) => {
    for (let i = 0; i < state.actions.length; i++) {
      let slug = slugify(state.actions[i].assignment, {
        replacement: '-',
        lower: true
      })

      if (slug === key) {
        return state.actions[i]
      }
    }

    return null
  },
  getLatestActions: state => {
    const currentTime = new Date().getTime()

    // Check if last cache is more than an hour old
    return (state.expires - currentTime > 0) ? state.actions : null
  }
}

/**
 * Vuex Actions
 * @example this.$store.dispatch('saveFeatured', data)
 */
const actions = {
  saveLatestActions ({ commit }, data) {
    commit('SAVE_LATEST_ACTIONS', data)
  },
  flushLatestActions ({ commit }) {
    commit('FLUSH_LATEST_ACTIONS')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
