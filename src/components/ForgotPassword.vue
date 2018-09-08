<template>
  <sw-forgot-password-form class="forgot-password"
    @signUp="signUp"
    @login="login"
    @hideLoginError="hideLoginError"
    @showLoginError="showLoginError"
    @forgotPassword="forgotPassword"
    @loginSuccess="loginSuccess"
    @loginError="loginError"
  />
</template>

<script>
import { ForgotPasswordForm } from 'ui-toolkit'
import { metaInfo } from '../util'

export default {
  name: 'ForgotPassword',
  metaInfo: metaInfo({
    title: 'Forgot Password',
    description: 'Forgot Password to StayWoke'
  }),
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
