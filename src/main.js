import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import vuescroll from 'vue-scroll'
import Meta from 'vue-meta'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

// Custom import just the icons we need, rather than the entire library
import faPhone from '@fortawesome/fontawesome-pro-solid/faPhone'
import faDollarSign from '@fortawesome/fontawesome-pro-solid/faDollarSign'
import faClock from '@fortawesome/fontawesome-pro-solid/faClock'
import faHandRock from '@fortawesome/fontawesome-pro-solid/faHandRock'
import faPencil from '@fortawesome/fontawesome-pro-solid/faPencil'
import faEnvelopeOpen from '@fortawesome/fontawesome-pro-solid/faEnvelopeOpen'
import faChevronRight from '@fortawesome/fontawesome-pro-solid/faChevronRight'

import faListAlt from '@fortawesome/fontawesome-pro-light/faListAlt'
import faChartBar from '@fortawesome/fontawesome-pro-light/faChartBar'
import faSignOut from '@fortawesome/fontawesome-pro-light/faSignOut'
import faSignIn from '@fortawesome/fontawesome-pro-light/faSignIn'

fontawesome.library.add(faPhone, faDollarSign, faClock, faHandRock, faPencil, faEnvelopeOpen, faChevronRight, faListAlt, faChartBar, faSignOut, faSignIn)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Setup HTTP
Vue.http = Vue.prototype.$http = axios

// Setup APP MODE
Vue.appMode = Vue.prototype.appMode = process.env.APP_MODE

// Use Moment with Timezone Support
Vue.use(VueMoment, {
  moment
})

// Support Scroll Watch
Vue.use(vuescroll, {
  debounce: 600
})

// Support META Data
Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
