import md5 from 'md5'

const state = {
  account: {}
}

const mutations = {
  LOGIN (state, data) {
    state.account = data
  },
  LOGOUT (state, data) {
    state.account = {}
  },
  VALIDATE (state, data) {
    state.account.isMobileVerified = data
  }
}

/**
 * Vuex Actions
 * @example this.$store.getters.getUserFullName
 */
const getters = {
  getUserAccount: state => {
    return (typeof state.account.token !== 'undefined')
      ? state.account
      : null
  },
  getFirstName: state => {
    return (state.account.firstName)
      ? state.account.firstName
      : null
  },
  getUserFullName: state => {
    return (state.account.firstName && state.account.lastName)
      ? `${state.account.firstName} ${state.account.lastName}`
      : null
  },
  getUserInitials: state => {
    return (state.account.firstName && state.account.lastName)
      ? `${state.account.firstName.charAt(0)}${state.account.lastName.charAt(0)}`
      : 'SW'
  },
  getUserEmail: state => {
    return (state.account.email)
      ? state.account.email
      : null
  },
  getUserEmailHash: state => {
    return (state.account.email)
      ? md5(state.account.email)
      : null
  },
  getUserRole: state => {
    return (state.account.role)
      ? state.account.role
      : null
  },
  getUserToken: state => {
    return (state.account.firstName)
      ? state.account.token
      : null
  },
  isLoggedIn: state => {
    return (typeof state.account !== 'undefined' && typeof state.account.token !== 'undefined')
  },
  isSuperUser: state => {
    return (typeof state.account !== 'undefined' && typeof state.account.role !== 'undefined' && state.account.role === 'superuser')
  },
  isVerified: state => {
    return (typeof state.account !== 'undefined' && typeof state.account.token !== 'undefined' && typeof state.account !== 'undefined' && state.account.isMobileVerified === true)
  }
}

/**
 * Vuex Actions
 * @example this.$store.dispatch('userLogin', data)
 */
const actions = {
  userLogout ({
    commit
  }, data) {
    commit('LOGOUT', data)
  },
  userLogin ({
    commit
  }, data) {
    commit('LOGIN', data)
  },
  userValid ({
    commit
  }, data) {
    commit('VALIDATE', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
