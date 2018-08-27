<template>
  <div></div>
</template>

<script>
import { AMZ } from '../aws'
import { EventBus } from '../event-bus'

export default {
  name: 'Logout',
  created () {
    AMZ.Lambda.callPrivate('logout').then(resp => {
      EventBus.$emit('USER_LOGOUT')

      this.$store.dispatch('userLogout')
      this.$router.push({ name: 'index' })
    }, error => {
      console.log('Logout Error:', error.message)

      EventBus.$emit('USER_LOGOUT')

      this.$store.dispatch('userLogout')
      this.$router.push({ name: 'index' })
    })
  }
}
</script>
