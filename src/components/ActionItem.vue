<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <sw-take-action class="action" v-if="action" :action="action" />
  </transition>
</template>

<script>
import slugify from 'slugify'
import { AMZ } from '../aws'

import TakeAction from '@/components/organisms/take-action'

export default {
  name: 'Documentation',
  data () {
    return {
      action: null
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      let self = this

      // @TODO: Get specific action from AWS rather than looping for a match
      AMZ.Lambda.callPublic('getActions').then(actions => {
        for (let i = 0; i < actions.length; i++) {
          let slug = slugify(actions[i].assignment, {
            replacement: '-',
            lower: true
          })

          if (this.$route.params.slug === slug) {
            self.action = actions[i] // @TODO: Store result in Vuex
            break
          }
        }
      }, error => {
        console.error('ERROR: getActions', error)
      })
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
