<template>
  <el-dialog class="dialog" :title="enterVerification ? 'Verification Code' : 'Info Request'" :visible.sync="dialogVisible" width="300px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-alert type="error" :title="errorMessage" :closable="false" show-icon v-if="errorMessage" />

    <div v-if="needContactInfo">
      <span>To start calling your represenatives, we need just two pieces of info:</span>

      <el-form :model="setupForm" :rules="rules" ref="setupForm" label-width="120px" style="max-width: 480px; text-align: left;" label-position="top">
        <el-form-item label="Home Address" prop="address">
          <el-input type="text" placeholder="123 Any St, City, ST 12345" v-model="setupForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input type="text" placeholder="123-456-7890" v-model="setupForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('setupForm')">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="!needContactInfo && enterVerification">
      <span>We just sent you a verification code to {{ setupForm.phone }}. Please enter the code below to complete your verification.</span>

      <el-form :model="verifyForm" :rules="verifyRules" ref="verifyForm" label-width="120px" style="max-width: 480px; text-align: left;" label-position="top">
        <el-form-item prop="code">
          <el-input type="number" placeholder="0123456" v-model="verifyForm.code" auto-complete="off"></el-input>
          <a href="javascript:void(0)" class="resend-code" @click="resendVerification()">Resend Code</a>
          <span class="sent" v-if="resentVerification">✓</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitVerification('verifyForm')">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { parseAddress } from '../../../../address'
import { AMZ } from '../../../../aws'

import Button from 'ui-toolkit/src/components/atoms/button'
import Dialog from 'ui-toolkit/src/components/atoms/dialog'
import Form from 'ui-toolkit/src/components/molecules/form'
import FormItem from 'ui-toolkit/src/components/atoms/form-item'
import Input from 'ui-toolkit/src/components/atoms/input'

export default {
  name: 'Dialog',
  data () {
    var validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your Home Address'))
      } else {
        const address = parseAddress(value)
        if (address && typeof address.number === 'string' && typeof address.street === 'string' && typeof address.city === 'string' && typeof address.state === 'string' && typeof address.zip) {
          callback()
        } else {
          callback(new Error('Invalid Home Address'))
        }
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your Phone Number'))
      } else {
        var pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
        if (value && pattern.test(value)) {
          callback()
        } else {
          callback(new Error('Invalid Phone Number'))
        }
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter Verification Code'))
      } else {
        var pattern = /^[0-9]{6}$/
        if (value && pattern.test(value)) {
          callback()
        } else {
          callback(new Error('Invalid Verification Code'))
        }
      }
    }

    return {
      errorMessage: null,
      dialogVisible: false,
      needContactInfo: true,
      enterVerification: false,
      resentVerification: false,
      setupForm: {
        address: '',
        phone: ''
      },
      rules: {
        address: [{
          validator: validateAddress,
          trigger: 'blur'
        }],
        phone: [{
          validator: validatePhone,
          trigger: 'blur'
        }]
      },
      verifyForm: {
        code: ''
      },
      verifyRules: {
        code: [{
          validator: validateCode,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.dialogVisible = (this.$store.getters.isLoggedIn && !this.$store.getters.isVerified)
  },
  methods: {
    submitForm (formName) {
      let self = this
      this.errorMessage = null

      this.$refs[formName].validate((valid) => {
        if (valid) {
          AMZ.Lambda.callPublic('registerToCallReps', { address: this.setupForm.address, phoneNumber: this.setupForm.phone.replace(/-/g, '') }).then(user => {
            this.$store.dispatch('userLogin', user)
            this.needContactInfo = false

            if (!user.isMobileVerified) {
              this.enterVerification = true
            } else {
              this.dialogVisible = false
            }
          }, error => {
            self.errorMessage = error.message
          })
        } else {
          self.errorMessage = 'Invalid Form'
          return false
        }
      })
    },
    submitVerification (formName) {
      let self = this
      this.errorMessage = null

      this.$refs[formName].validate((valid) => {
        if (valid) {
          AMZ.Lambda.callPublic('verifyPhoneNumber', { verificationCode: this.verifyForm.code, phoneNumber: this.setupForm.phone.replace(/-/g, '') }).then(data => {
            if (data.errorMessage) {
              self.errorMessage = data.errorMessage
            } else if (!data.success) {
              self.errorMessage = 'An Unknown Error Occured.  Please Try Again.'
            } else {
              this.dialogVisible = false
              this.$store.dispatch('userValid', true)
            }
          }, error => {
            self.errorMessage = error.message
          })
        } else {
          self.errorMessage = 'Invalid Form'
          return false
        }
      })
    },
    resendVerification (formName) {
      let self = this
      this.errorMessage = null

      AMZ.Lambda.callPublic('resendVerificationCode', { id: this.setupForm.phone.replace(/-/g, '') }).then(data => {
        if (data) {
          self.resentVerification = true

          setTimeout(() => {
            self.resentVerification = false
          }, 3000)
        }
      }, error => {
        self.errorMessage = error.message
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    Button,
    Dialog,
    Form,
    FormItem,
    Input
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  .resend-code {
    color: #666;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }
}
</style>
