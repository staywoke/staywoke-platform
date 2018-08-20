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
// import { tempStore } from '../store/modules/store'

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
  mounted () {
    // Initialize Amazon
    AMZ.init()

    // Fetch Data
    this.getArticles()
    this.getFeaturedContent()
    this.getActions()
  },
  methods: {
    getArticles () {
      // AMZ.callLambda('getArticles').then(news => {
      //   console.log('getArticles', news)
      // }, error => {
      //   console.error('ERROR: getArticles()', error)
      // })

      this.news = mockNews
    },
    getFeaturedContent () {
      // @TODO: This should come from Amazon
      this.tweet = '988889085958938633'
    },
    getActions () {
      // AMZ.callLambda('getActions').then(actions => {
      //   console.log('actions', actions)
      // }, error => {
      //   console.error('ERROR: getActions()', error)
      // })

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
