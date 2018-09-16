<template>
  <div></div>
</template>

<script>
import { AMZ } from '../aws'
import { EventBus } from '../event-bus'
import { metaInfo } from '../util'

export default {
  name: 'Logout',
  metaInfo: metaInfo({
    title: 'Logout',
    description: 'Logout of StayWoke'
  }),
  created () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'index' })
    } else {
      AMZ.Lambda.callPrivate('logout').then(resp => {
        EventBus.$emit('USER_LOGOUT')

        this.$store.dispatch('userLogout')
        this.$store.dispatch('flushNews')
        this.$store.dispatch('flushFeatured')
        this.$store.dispatch('flushLatestActions')

        window.location.href = '/'
      }, error => {
        console.log('Logout Error:', error.message)

        EventBus.$emit('USER_LOGOUT')

        this.$store.dispatch('userLogout')
        this.$store.dispatch('flushNews')
        this.$store.dispatch('flushFeatured')
        this.$store.dispatch('flushLatestActions')

        window.location.href = '/'
      })
    }
  }
}
</script>
