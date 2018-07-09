<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <sw-news-article class="article" :article="article" @backClicked="backClicked" @readMoreClicked="readMoreClicked" />
  </transition>
</template>

<script>
import { mockNews } from '../mocks'
import { Button } from 'ui-toolkit'

import NewsArticle from '@/components/organisms/news-article'

export default {
  name: 'Documentation',
  data () {
    return {
      article: null
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      for (let i = 0; i < mockNews.length; i++) {
        if (mockNews[i].slug === this.$route.params.slug) {
          this.article = mockNews[i]
          break
        }
      }
    },
    backClicked () {

    },
    readMoreClicked () {

    }
  },
  components: {
    Button,
    NewsArticle
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding: 10px;
}
</style>
