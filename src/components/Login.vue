<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <sw-login-form class="login"
      @signUp="signUp"
      @hideLoginError="hideLoginError"
      @showLoginError="showLoginError"
      @forgotPassword="forgotPassword"
      @loginSuccess="loginSuccess"
      @loginError="loginError"
    />
  </transition>
</template>

<script>
import { LoginForm } from 'ui-toolkit'

export default {
  name: 'Login',
  data () {
    return {}
  },
  created () {
    // @TODO: Check Login Status
  },
  methods: {
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
