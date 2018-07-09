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

import News from '@/components/organisms/news'
import FeaturedContent from '@/components/molecules/featured-content'
import LatestActions from '@/components/organisms/latest-actions'

export default {
  name: 'Index',
  data () {
    return {
      news: null,
      tweet: null,
      actions: null
    }
  },
  created () {
    this.getNews()
    this.getFeaturedContent()
    this.getLatestActions()
  },
  methods: {
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
