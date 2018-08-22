<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <sw-register-form class="register"
      @login="login"
      @hideLoginError="hideLoginError"
      @showLoginError="showLoginError"
      @loginSuccess="loginSuccess"
      @loginError="loginError"
    />
  </transition>
</template>

<script>
import { RegisterForm } from 'ui-toolkit'

export default {
  name: 'Register',
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
    hideLoginError () {},
    showLoginError () {},
    loginSuccess () {},
    loginError () {}
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
