<template>
  <transition name="fade" mode="in-out" enter-active-class="fadeInLeft" leave-active-class="hide">
    <div>
      <el-alert
        class="success"
        type="success"
        title="Account Created"
        description="Redirecting to login page ..."
        :closable="false"
        show-icon
        v-if="registerSuccess"
      />
      <sw-register-form class="register"
        :invite-only="false"
        :error-message="errorMessage"
        @login="login"
        @registerValid="registerValid"
        v-if="!registerSuccess"
      />
    </div>
  </transition>
</template>

<script>
import Alert from 'ui-toolkit/src/components/atoms/alert'
import RegisterForm from 'ui-toolkit/src/components/templates/register-form'

import { AMZ } from '../aws'
import { EventBus } from '../event-bus'
import { metaInfo } from '../util'

export default {
  name: 'Register',
  metaInfo: metaInfo({
    title: 'Register',
    description: 'Register with StayWoke'
  }),
  data () {
    return {
      errorMessage: null,
      registerSuccess: false
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
        lastName: form.lastname,
        password: form.password,
        mobile: form.phone,
        username: form.username
      }

      AMZ.Lambda.callPublic('register', payload).then(resp => {
        if (resp && resp.success) {
          setTimeout(() => {
            EventBus.$emit('USER_REGISTER', resp)
            EventBus.$emit('USER_LOGIN', resp)

            this.$store.dispatch('userLogin', resp)
            window.location.href = '/'
          }, 3000)
        }
      }, error => {
        console.error('REGISTER:', error)
        self.errorMessage = error.message
      })
    }
  },
  components: {
    Alert,
    RegisterForm
  }
}
</script>

<style lang="scss" scoped>
.success {
  margin: 0 auto;
  max-width: 300px;
  margin-top: 15px;
}
.register {
  margin: 0 auto;
  padding: 10px;
  background: #FFF;
  border: 1px solid rgb(225, 232, 237);
  border-radius: 5px;
  margin-top: 10px;
}
</style>
