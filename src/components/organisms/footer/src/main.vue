<template>
  <el-footer class="footer">
    <el-row>
      <el-col :span="8">
        <router-link :to="{ name: 'index' }">
          <el-button type="text" class="footer-button" @click="feedClicked">
            <font-awesome-icon size="2x" :icon="['fal', 'list-alt']" class="button-icon"></font-awesome-icon>
            <span class="button-label">Feed</span>
            <span class="notification" v-if="feedUpdated"></span>
          </el-button>
        </router-link>
      </el-col>
      <el-col :span="8">
        <el-button class="action-center" @click="myImpactClicked">
          My Impact
        </el-button>
      </el-col>
      <el-col :span="8">
        <router-link :to="{ name: 'logout' }" v-if="loggedIn">
          <el-button type="text" class="footer-button">
            <font-awesome-icon size="2x" :icon="['fal', 'sign-out']" class="button-icon"></font-awesome-icon>
            <span class="button-label">Logout</span>
          </el-button>
        </router-link>

        <router-link :to="{ name: 'login' }" v-if="!loggedIn">
          <el-button type="text" class="footer-button">
            <font-awesome-icon size="2x" :icon="['fal', 'sign-in']" class="button-icon"></font-awesome-icon>
            <span class="button-label">Login</span>
          </el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-footer>
</template>

<script>
import { Button, Col, Footer, Icon, Row } from 'ui-toolkit'

export default {
  name: 'Header',
  props: {
    feedUpdated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loggedIn: this.$store.getters.isLoggedIn
    }
  },
  methods: {
    feedClicked () {
      this.$emit('feedClicked')
    },
    actionCenterClicked () {
      this.$emit('actionCenterClicked')
    },
    myImpactClicked () {
      this.$emit('myImpactClicked')
      this.$emit('hideDetails')
    }
  },
  components: {
    Button,
    Col,
    Footer,
    Icon,
    Row
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 60px;
  padding: 0;
  margin: 0;
  width: 100%;
  line-height: 60px;
  z-index: 1000;
  background: #FFF;
  border-top: 1px solid #ededed;
  overflow: hidden;

  .el-row {
    margin: 0;
  }

  .el-col-8 {
    height: 60px;
    overflow: hidden;
  }

  .action-center {
    border: none;
    background-color: #de0000;
    color: #FFF;
    width: 90px;
    height: 50px;
    line-height: 16px;
    font-size: 16px;
    white-space: normal;
    text-transform: uppercase;
    font-weight: 900;
    border-radius: 3px;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 5px;
    left: calc(50% - 45px);
  }

  .footer-button {
    color: #000;
    text-transform: uppercase;
    font-size: 10px;
    text-align: center;
    width: 100%;
    display: block;
    padding: 0;
    margin: 0;
    height: 60px;
    overflow: hidden;
    position: relative;
    top: 0;

    .button-icon {
      font-size: 22px;
      position: absolute;
      margin-left: -11px;
      top: 14px;
    }

    .button-label {
      color: #666;
      width: 100%;
      position: absolute;
      top: 38px;
      left: 0;
      margin: 0;
      padding: 0;
    }

    .notification {
      background-color: #00c0f9;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      display: block;
      position: absolute;
      top: 50px;
      left: calc(50% - 3px);
    }
  }
}
</style>
