<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <sw-news-article class="article" :article="article" v-if="article" />
  </transition>
</template>

<script>
import { Button } from 'ui-toolkit'
import { AMZ } from '../aws'

import NewsArticle from '@/components/organisms/news-article'

export default {
  name: 'Documentation',
  data () {
    return {
      article: null
    }
  },
  created () {
    const article = this.$store.getters.getNewsArticle(this.$route.params.slug)

    if (article) {
      this.article = article
    } else {
      AMZ.Lambda.fetch('getArticles').then(news => {
        this.$store.dispatch('saveNews', news)
        this.article = this.$store.getters.getNewsArticle(this.$route.params.slug)
      }, error => {
        console.error(error)
        this.$router.push({ name: 'index' })
      })
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
