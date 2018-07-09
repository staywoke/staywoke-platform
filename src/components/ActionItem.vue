<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <sw-take-action class="action" :action="action" @backClicked="backClicked" @actionClicked="actionClicked" />
  </transition>
</template>

<script>
import { mockActions } from '../mocks'

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
      for (let i = 0; i < mockActions.length; i++) {
        if (mockActions[i].slug === this.$route.params.slug) {
          this.action = mockActions[i]
          break
        }
      }
    },
    backClicked () {

    },
    actionClicked () {

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
