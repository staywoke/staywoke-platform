<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <div class="router-view feed">
      <sw-news :articles="news" v-if="news" />
      <sw-featured-content :id="tweet" v-if="tweet" />
      <sw-latest-actions :actions="actions" v-if="actions" />
    </div>
  </transition>
</template>

<script>
import { mockActions, mockNews } from '../mocks'

// @TODO: connect this to Vuex rather than tempStore
import { AMZ } from '../aws'
// import { tempStore } from '../store/modules/store'

import News from '@/components/organisms/news'
import FeaturedContent from '@/components/molecules/featured-content'
import LatestActions from '@/components/organisms/latest-actions'

export default {
  name: 'Index',
  data () {
    return {
      news: [],
      tweet: null,
      actions: [],
      user: null
    }
  },
  mounted () {
    // Fetch Data
    this.getArticles()
    this.getFeaturedContent()
    this.getActions()
  },
  methods: {
    getArticles () {
      let self = this

      AMZ.Lambda.callPublic('getArticles').then(news => {
        console.log('getArticles', news)
        self.news = news // @TODO: Store results in Vuex
      }, error => {
        console.error('ERROR: getArticles', error) // @TODO: Get this working with AWS ( currently failing )
        self.news = mockNews
      })
    },
    getFeaturedContent () {
      let self = this

      AMZ.Lambda.callPublic('getTweets').then(tweets => {
        console.log('getTweets', tweets) // @TODO: Store results in Vuex
      }, error => {
        console.error('ERROR: getTweets', error) // @TODO: Get this working with AWS ( currently failing )
        self.tweet = '988889085958938633'
      })
    },
    getActions () {
      let self = this

      AMZ.Lambda.callPublic('getActions').then(actions => {
        console.log('getActions', actions)
        self.actions = actions // @TODO: Store results in Vuex
      }, error => {
        console.error('ERROR: getActions', error)
        self.actions = mockActions
      })
    }
  },
  components: {
    News,
    FeaturedContent,
    LatestActions
  }
}
</script>

<style lang="scss">
@media (min-width: 1024px) {
  body {
    background-color: #f2f2f2;
  }

  .feed {
    display: flex;
    height: calc(100% - 60px);
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: auto;
    align-content: top;

    .news, .featured-content, .latest-actions {
      flex: 1;
      margin: 0 !important;
      width: calc(100% / 3);
      padding-top: 0 !important;

      h2 {
        margin: 10px 0 !important;
        font-weight: 500 !important;
        font-size: 14px !important;
      }

      ul {
        padding: 0;
      }
    }
  }
}
</style>
