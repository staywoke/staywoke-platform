<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <sw-take-action class="action" v-if="action" :action="action" />
  </transition>
</template>

<script>
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
    const action = this.$store.getters.getLatestAction(this.$route.params.slug)

    if (action) {
      this.action = action
    } else {
      AMZ.Lambda.fetch('getActions').then(actions => {
        this.$store.dispatch('saveLatestActions', actions)
        this.action = this.$store.getters.getLatestAction(this.$route.params.slug)
      }, error => {
        console.error('Private getActions', error)
        this.actionsError = '403 Error: Permission Denied'
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
