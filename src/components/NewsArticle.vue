<template>
  <transition name="fade" mode="out-in" enter-active-class="fadeInRight" leave-active-class="hide">
    <sw-news-article class="article" :article="article" v-if="article" />
  </transition>
</template>

<script>
import readingTime from 'reading-time'
import keywordExtractor from 'keyword-extractor'
import Button from 'ui-toolkit/src/components/atoms/button'

import { AMZ } from '../aws'
import { EventBus } from '../event-bus'
import { metaInfo } from '../util'

import NewsArticle from '@/components/organisms/news-article'

export default {
  name: 'Documentation',
  metaInfo () {
    return this.meta
  },
  data () {
    return {
      article: null,
      readStart: null,
      readTime: null,
      articleRead: false,
      scrollPercent: null,
      interval: null,
      meta: {}
    }
  },
  created () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'login' })
    } else {
      const slug = this.$route.params.slug
      const article = this.$store.getters.getNewsArticle(slug)

      if (article) {
        this.setData(article)
      } else {
        AMZ.Lambda.fetch('getArticle', { slug: slug }).then(article => {
          this.$store.dispatch('saveArticle', article)
          this.setData(article)
        }, error => {
          console.error(error)
          this.$router.push({ name: 'index' })
        })
      }
    }
  },
  mounted () {
    EventBus.$off('SCROLLED')
    EventBus.$on('SCROLLED', (scroll) => {
      if (this.readStart) {
        this.checkReadStatus(scroll)
      }
    })

    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.checkReadStatus()
    }, 1000)
  },
  methods: {
    setData (article) {
      this.article = article

      if (!article.read) {
        this.startReadChecker(article)
      } else {
        this.articleRead = true
      }

      const keywords = keywordExtractor.extract(`${article.source} ${article.title} ${article.summary}`, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        return_chained_words: false,
        remove_duplicates: false,
        return_max_ngrams: 50
      })

      this.meta = metaInfo({
        title: article.title,
        keywords: keywords.sort().join(', '),
        description: article.summary,
        image: article.imageUrl,
        url: `${window.location.protocol}//${window.location.host}/news/${article.slug}`
      })
    },
    startReadChecker (article) {
      const reading = readingTime(`${article.source} ${article.title} ${article.summary}`)

      this.readStart = new Date().getTime()
      this.readTime = reading.time
    },
    checkReadStatus (scroll) {
      if (this.readStart && this.readTime && !this.articleRead) {
        const now = new Date().getTime()
        const enoughtTime = ((now - this.readStart >= this.readTime) * 0.75)

        if (typeof scroll !== 'undefined' && scroll.nearBottom && enoughtTime) {
          this.articleRead = true
        } else if (typeof scroll !== 'undefined' && scroll.percentScrolled) {
          this.scrollPercent = scroll.percentScrolled
        } else if (!scroll && this.scrollPercent && this.scrollPercent > 75 && enoughtTime) {
          this.articleRead = true
        } else if (!scroll && !this.scrollPercent && enoughtTime) {
          this.articleRead = true
        }

        if (this.articleRead) {
          this.$store.dispatch('markArticleRead', this.article)

          if (this.$store.getters.isLoggedIn) {
            AMZ.Lambda.fetch('updateUserImpact', {
              type: 'addArticle',
              resourceId: this.article.id
            })
          }
        }
      }
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
