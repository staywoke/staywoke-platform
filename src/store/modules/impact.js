const state = {
  impact: []
}

const mutations = {
  SAVE_IMPACT (state, data) {
    state.impact = data
  },
  FLUSH_IMPACT (state) {
    state.impact = []
  }
}

/**
 * Vuex Actions
 * @example this.$store.getters.getImpactCount
 */
const getters = {
  getImpact: state => {
    return state.impact
  },
  getImpactCount: state => {
    let count = 0

    for (let i = 0; i < state.impact.length; i++) {
      count += state.impact[i].total
    }

    return count
  }
}

/**
 * Vuex Actions
 * @example this.$store.dispatch('saveImpact', data)
 */
const actions = {
  saveImpact ({ commit }, data) {
    commit('SAVE_IMPACT', data)
  },
  flushImpact ({ commit }) {
    commit('FLUSH_IMPACT')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
