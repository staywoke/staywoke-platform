<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <div class="router-view feed">
      <sw-news :articles="news" :error-message="newsError" v-if="news || newsError" />
      <sw-featured-content :id="tweet" :error-message="tweetError" v-if="tweet || tweetError"/>
      <sw-latest-actions :error-message="actionsError" :actions="actions" v-if="actions || actionsError" />
    </div>
  </transition>
</template>

<script>
import { AMZ } from '../aws'
import { EventBus } from '../event-bus'

import News from '@/components/organisms/news'
import FeaturedContent from '@/components/molecules/featured-content'
import LatestActions from '@/components/organisms/latest-actions'

export default {
  name: 'Index',
  data () {
    return {
      news: null,
      newsError: null,
      tweet: null,
      tweetError: null,
      actions: null,
      actionsError: null,
      user: null
    }
  },
  created () {
    EventBus.$on('SESSION_EXPIRED', () => {
      this.$router.push({ name: 'logout' })
    })
  },
  mounted () {
    this.getArticles()
    this.getFeaturedContent()
    this.getActions()
  },
  methods: {
    getArticles () {
      let self = this

      if (this.$store.getters.isLoggedIn) {
        AMZ.Lambda.callPrivate('getArticles').then(news => {
          console.log('getArticles', news)
          self.news = news // @TODO: Store results in Vuex
        }, error => {
          console.error('Private getArticles', error)
          self.newsError = '403 Error: Permission Denied'
        })
      } else {
        AMZ.Lambda.callPublic('getArticles').then(news => {
          self.news = news // @TODO: Store results in Vuex
        }, error => {
          console.error('Public getArticles', error)
          self.newsError = '403 Error: Permission Denied'
        })
      }
    },
    getFeaturedContent () {
      let self = this

      if (this.$store.getters.isLoggedIn) {
        AMZ.Lambda.callPrivate('getTweets').then(tweets => {
          console.log('getTweets', tweets)
          if (tweets && tweets.length > 0) {
            // @TODO: There is currently no response from AWS
            // @TODO: Store results in Vuex
          } else {
            self.tweetError = 'No Featured Content'
          }
        }, error => {
          console.error('Private getTweets', error)
          self.tweetError = '403 Error: Permission Denied'
        })
      } else {
        AMZ.Lambda.callPublic('getTweets').then(tweets => {
          console.log('getTweets', tweets)
          if (tweets && tweets.length > 0) {
            // @TODO: There is currently no response from AWS
            // @TODO: Store results in Vuex
          } else {
            self.tweetError = 'No Featured Content'
          }
        }, error => {
          console.error('Public getTweets', error)
          self.tweetError = '403 Error: Permission Denied'
        })
      }
    },
    getActions () {
      let self = this

      if (this.$store.getters.isLoggedIn) {
        AMZ.Lambda.callPrivate('getActions').then(actions => {
          console.log('Private getActions', actions)
          self.actions = actions // @TODO: Store results in Vuex
        }, error => {
          console.error('Private getActions', error)
          this.actionsError = '403 Error: Permission Denied'
        })
      } else {
        AMZ.Lambda.callPublic('getActions').then(actions => {
          self.actions = actions // @TODO: Store results in Vuex
        }, error => {
          console.error('Public getActions', error)
          this.actionsError = '403 Error: Permission Denied'
        })
      }
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
