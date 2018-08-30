<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <sw-register-form class="register"
      invite-only
      :error-message="errorMessage"
      @login="login"
      @registerValid="registerValid"
    />
  </transition>
</template>

<script>
import { RegisterForm } from 'ui-toolkit'

import { AMZ } from '../aws'
import { EventBus } from '../event-bus'

export default {
  name: 'Register',
  data () {
    return {
      errorMessage: null
    }
  },
  mounted () {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    login () {
      this.$router.push({ name: 'login' })
    },
    registerValid (form) {
      let self = this
      this.errorMessage = null

      const payload = {
        email: form.email,
        firstName: form.firstname,
        inviteCode: form.inviteCode,
        lastName: form.lastname,
        password: form.password,
        mobile: form.phone,
        username: form.username
      }

      AMZ.Lambda.callPublic('register', payload).then(resp => {
        console.log('REGISTER:', resp)
        EventBus.$emit('USER_REGISTER', resp)
      }, error => {
        console.error('REGISTER:', error)
        self.errorMessage = error.message
      })
    }
  },
  components: {
    RegisterForm
  }
}
</script>

<style lang="scss" scoped>
.register {
  margin: 0 auto;
  padding: 10px;
  background: #FFF;
  border: 1px solid rgb(225, 232, 237);
  border-radius: 5px;
  margin-top: 10px;
}
</style>
