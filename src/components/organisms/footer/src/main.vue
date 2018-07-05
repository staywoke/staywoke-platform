<template>
  <el-footer class="footer">
    <el-row>
      <el-col :span="8">
        <el-button type="text" class="footer-button" @click="feedClicked">
          <font-awesome-icon size="2x" :icon="['fal', 'list-alt']" class="button-icon"></font-awesome-icon>
          <span class="button-label">Feed</span>
          <span class="notification" v-if="feedUpdated"></span>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button class="action-center" @click="actionCenterClicked">
          Action Center
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="text" class="footer-button" @click="myImpactClicked">
          <font-awesome-icon size="2x" :icon="['fal', 'check-square']" class="button-icon"></font-awesome-icon>
          <span class="button-label">My Impact</span>
        </el-button>
      </el-col>
    </el-row>
  </el-footer>
</template>

<script>
import { Button, Col, Footer, Icon, Row } from 'ui-toolkit'

export default {
  name: 'Header',
  components: {
    Button,
    Col,
    Footer,
    Icon,
    Row
  },
  props: {
    feedUpdated: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    feedClicked() {
      this.$emit('feedClicked')
    },
    actionCenterClicked() {
      this.$emit('actionCenterClicked')
    },
    myImpactClicked() {
      this.$emit('myImpactClicked')
      this.$emit('hideDetails')
    }
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
