<template>
  <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutLeft">
    <div class="router-view welcome">
      <img src="../assets/logo.jpg">

      <h1>UI Toolkit</h1>
      <h2>Documentation</h2>

      <router-link :to="{ name: 'index' }">
        <el-button round type="success" icon="el-icon-arrow-left">
          Home
        </el-button>
      </router-link>
    </div>
  </transition>
</template>

<script>
import { Button } from 'ui-toolkit'

export default {
  name: 'Documentation',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Button
  }
}
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 40px;
}
h1 {
  font-weight: normal;
}
h2 {
  color: #4cad1c;
  font-weight: 300;
}
</style>
