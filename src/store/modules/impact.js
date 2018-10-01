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
    let data = {}
    let impact = []

    state.impact.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    for (let i = 0; i < state.impact.length; i++) {
      const impact = state.impact[i]

      if (!data.hasOwnProperty(impact.type)) {
        data[impact.type] = {
          type: impact.type,
          total: 0,
          lastTitle: impact.name,
          lastDate: impact.date
        }
      }

      data[impact.type].total += 1
    }

    const keys = Object.keys(data)

    for (let i = 0; i < keys.length; i++) {
      impact.push(data[keys])
    }

    return impact
  },
  getImpactList: (state) => (type) => {
    let impactList = []

    state.impact.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    for (let i = 0; i < state.impact.length; i++) {
      const impact = state.impact[i]

      if (impact.type === type) {
        impactList.push(impact)
      }
    }

    return impactList
  },
  getImpactCount: state => {
    return state.impact.length
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
