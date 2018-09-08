<template>
  <sw-take-action class="action" v-if="action" :action="action" />
</template>

<script>
import readingTime from 'reading-time'
import keywordExtractor from 'keyword-extractor'

import { AMZ } from '../aws'
import { EventBus } from '../event-bus'
import { metaInfo } from '../util'

import TakeAction from '@/components/organisms/take-action'

export default {
  name: 'ActionItem',
  metaInfo () {
    return this.meta
  },
  data () {
    return {
      action: null,
      readStart: null,
      readTime: null,
      actionRead: false,
      scrollPercent: null,
      interval: null,
      meta: {}
    }
  },
  created () {
    const slug = this.$route.params.slug
    const action = this.$store.getters.getLatestAction(slug)

    if (action) {
      this.setData(action)
    } else {
      AMZ.Lambda.fetch('getAction', { slug: slug }).then(action => {
        this.$store.dispatch('saveLatestAction', action)
        this.setData(action)
      }, error => {
        console.error('Private getActions', error)
        this.actionsError = '403 Error: Permission Denied'
      })
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
    setData (action) {
      this.action = action
      this.startReadChecker(action)

      const keywords = keywordExtractor.extract(`Take Action ${action.assignment} ${action.name} ${action.title} ${action.summary}`, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        return_chained_words: false,
        remove_duplicates: false,
        return_max_ngrams: 50
      })

      this.meta = metaInfo({
        title: `Take Action: ${action.name}`,
        keywords: keywords.sort().join(', '),
        description: `Take Action: ${action.assignment}`,
        image: action.imageUrl,
        url: `${window.location.protocol}//${window.location.host}/action/${action.type}/${action.slug}`
      })
    },
    startReadChecker (action) {
      const reading = readingTime(`${action.name} ${action.title} ${action.summary}`)

      this.readStart = new Date().getTime()
      this.readTime = reading.time
    },
    checkReadStatus (scroll) {
      if (this.readStart && this.readTime && !this.actionRead) {
        const now = new Date().getTime()
        const enoughtTime = ((now - this.readStart >= this.readTime) * 0.75)

        if (typeof scroll !== 'undefined' && scroll.nearBottom && enoughtTime) {
          this.actionRead = true
        } else if (typeof scroll !== 'undefined' && scroll.percentScrolled) {
          this.scrollPercent = scroll.percentScrolled
        } else if (!scroll && this.scrollPercent && this.scrollPercent > 75 && enoughtTime) {
          this.actionRead = true
        } else if (!scroll && !this.scrollPercent && enoughtTime) {
          this.actionRead = true
        }

        if (this.actionRead) {
          console.log('ACTION_READ')
        }
      }
    }
  },
  components: {
    TakeAction
  }
}
</script>

<style lang="scss" scoped>
.action {
  padding: 10px;
}
</style>
