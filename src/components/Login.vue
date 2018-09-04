<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <sw-login-form class="login"
      :error-message="errorMessage"
      @signUp="signUp"
      @forgotPassword="forgotPassword"
      @loginValid="loginValid"
    />
  </transition>
</template>

<script>
import { LoginForm } from 'ui-toolkit'

import { AMZ } from '../aws'
import { EventBus } from '../event-bus'

export default {
  name: 'Login',
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
    signUp () {
      this.$router.push({ name: 'register' })
    },
    forgotPassword () {
      this.$router.push({ name: 'forgot-password' })
    },
    loginValid (form) {
      let self = this
      this.errorMessage = null

      AMZ.Lambda.callPublic('login', { userId: form.username, password: form.password }).then(auth => {
        EventBus.$emit('USER_LOGIN', auth)

        this.$store.dispatch('userLogin', auth)
        this.$router.push({ name: 'index' })
      }, error => {
        self.errorMessage = error.message
      })
    }
  },
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin: 0 auto;
  padding: 10px;
  background: #FFF;
  border: 1px solid rgb(225, 232, 237);
  border-radius: 5px;
  margin-top: 10px;
}
</style>
