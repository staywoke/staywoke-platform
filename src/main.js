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
import solid from '@fortawesome/fontawesome-pro-solid'
import regular from '@fortawesome/fontawesome-pro-regular'
import light from '@fortawesome/fontawesome-pro-light'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid, regular, light, brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Setup HTTP
Vue.http = Vue.prototype.$http = axios

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
