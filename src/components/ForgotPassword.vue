<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <sw-forgot-password-form class="forgot-password"
      @signUp="signUp"
      @login="login"
      @hideLoginError="hideLoginError"
      @showLoginError="showLoginError"
      @forgotPassword="forgotPassword"
      @loginSuccess="loginSuccess"
      @loginError="loginError"
    />
  </transition>
</template>

<script>
import { ForgotPasswordForm } from 'ui-toolkit'

export default {
  name: 'ForgotPassword',
  data () {
    return {}
  },
  created () {
    // @TODO: Check Login Status
  },
  methods: {
    login () {
      this.$router.push({ name: 'login' })
    },
    signUp () {
      this.$router.push({ name: 'register' })
    },
    hideLoginError () {},
    showLoginError () {},
    forgotPassword () {
      this.$router.push({ name: 'forgot-password' })
    },
    loginSuccess () {},
    loginError () {}
  },
  components: {
    ForgotPasswordForm
  }
}
</script>

<style lang="scss" scoped>
.forgot-password {
  margin: 0 auto;
  padding: 10px;
  background: #FFF;
  border: 1px solid rgb(225, 232, 237);
  border-radius: 5px;
  margin-top: 10px;
}
</style>
