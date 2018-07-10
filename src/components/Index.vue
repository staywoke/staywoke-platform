<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <div class="router-view feed">
      <sw-news :articles="news" />
      <sw-featured-content :id="tweet" />
      <sw-latest-actions :actions="actions" />
    </div>
  </transition>
</template>

<script>
import { mockActions, mockNews } from '../mocks'

// @TODO: connect this to Vuex rather than tempStore
import { AMZ } from '../aws'
import { tempStore } from '../store/modules/store'

import News from '@/components/organisms/news'
import FeaturedContent from '@/components/molecules/featured-content'
import LatestActions from '@/components/organisms/latest-actions'

export default {
  name: 'Index',
  data () {
    return {
      news: null,
      tweet: null,
      actions: null,
      user: null
    }
  },
  created () {
    this.getNews()
    this.getFeaturedContent()
    this.getLatestActions()

    // @TODO: This is just a test function that is called when the component is created
    // it calls methods.testAWS
    this.testAWS({
      username: 'test',
      password: 'abc123'
    })
  },
  methods: {
    testAWS (payload) {
      let self = this

      AMZ.initLogin()

      AMZ.callLambda('login', payload).then(user => {
        AMZ.setCredentials(user.rawCredentials)

        // Save to Local Storage
        tempStore.put('user', user)

        // @TODO: this needs to be placed within the main load or init function, so that it runs on refresh, app open
        // setInterval(AMZ.refreshCredentials, 300000)

        // Store User Data locally
        self.user = user
      })
    },
    getNews () {
      this.news = mockNews
    },
    getFeaturedContent () {
      this.tweet = '988889085958938633'
    },
    getLatestActions () {
      this.actions = mockActions
    }
  },
  components: {
    News,
    FeaturedContent,
    LatestActions
  }
}
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 40px;
}
h1 {
  font-weight: normal;
}
h2 {
  color: #4cad1c;
  font-weight: 300;
}
</style>
