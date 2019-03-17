<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="hide">
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
  created () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'login' })
    }
  },
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
