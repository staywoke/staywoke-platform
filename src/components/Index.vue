<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutRight">
    <div class="router-view welcome">
      <img src="../assets/logo.jpg">

      <h1>UI Toolkit</h1>
      <h2>Sample Project</h2>

      <router-link :to="{ name: 'documentation' }">
        <el-button round type="success">
          Documentation
          <i class="el-icon-arrow-right el-icon-right"></i>
        </el-button>
      </router-link>
    </div>
  </transition>
</template>

<script>
import { Button } from 'ui-toolkit'

export default {
  name: 'Index',
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
