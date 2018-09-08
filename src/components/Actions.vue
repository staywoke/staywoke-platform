<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <div class="actions">COMING SOON</div>
  </transition>
</template>

<script>
import { metaInfo } from '../util'

export default {
  name: 'ActionsPage',
  metaInfo: metaInfo({
    title: 'Actions',
    description: 'StayWoke Actions'
  }),
  data () {
    return {}
  },
  created () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.actions {
  padding: 50px;
  text-align: center;
}
</style>
