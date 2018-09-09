<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="hide">
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
import { metaInfo } from '../util'

import News from '@/components/organisms/news'
import FeaturedContent from '@/components/molecules/featured-content'
import LatestActions from '@/components/organisms/latest-actions'

export default {
  name: 'Index',
  metaInfo: metaInfo(),
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
    this.getArticles()
    this.getFeaturedContent()
    this.getActions()

    EventBus.$on('SESSION_EXPIRED', () => {
      this.$router.push({ name: 'logout' })
    })
  },
  methods: {
    getArticles () {
      const cached = this.$store.getters.getNewsArticles

      if (cached) {
        this.news = cached
      } else {
        AMZ.Lambda.fetch('getArticles').then(news => {
          this.news = news
          this.$store.dispatch('saveNews', news)
        }, error => {
          console.error('getArticles', error)
          this.newsError = '403 Error: Permission Denied'
          this.$store.dispatch('flushNews')
        })
      }
    },
    getFeaturedContent () {
      const cached = this.$store.getters.getFeaturedContent

      if (cached) {
        this.tweet = cached.id_str
      } else {
        AMZ.Lambda.fetch('getTweet').then(tweet => {
          if (tweet) {
            this.tweet = tweet.id_str
            this.$store.dispatch('saveFeatured', tweet)
          } else {
            this.tweetError = 'No Featured Content'
            this.$store.dispatch('flushFeatured')
          }
        }, error => {
          console.error('getTweets', error)
          this.tweetError = '403 Error: Permission Denied'
          this.$store.dispatch('flushFeatured')
        })
      }
    },
    getActions () {
      const cached = this.$store.getters.getLatestActions

      if (cached) {
        this.actions = cached
      } else {
        AMZ.Lambda.fetch('getActions').then(actions => {
          this.actions = actions
          this.$store.dispatch('saveLatestActions', actions)
        }, error => {
          console.error('getActions', error)
          this.actionsError = '403 Error: Permission Denied'
          this.$store.dispatch('flushLatestActions')
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
