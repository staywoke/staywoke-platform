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
import { AMZ } from '../aws'
import { LoginForm } from 'ui-toolkit'

export default {
  name: 'Login',
  data () {
    return {
      errorMessage: null
    }
  },
  mounted () {
    AMZ.init()

    // @TODO: Check if user is already logged in and redirect to home page if so
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

      AMZ.callLambda('login', { username: form.username, password: form.password }).then(auth => {
        // @TODO: Store `auth` data into Vuex store
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
