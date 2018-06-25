<template>
  <el-header class="header">
    <el-row>
      <el-col :span="10" class="account">
        <div class="user-avatar" @click="accountClicked">
          <img class="avatar" :src="'https://www.gravatar.com/avatar/' + emailHash + '?s=44'" />
        </div>
        <div class="user-details" @click="accountClicked">
          <strong>{{ username }}</strong>
          <span v-html="actionsTaken"></span>
        </div>
      </el-col>
      <el-col :span="4" class="logo">
        <div @click="logoClicked"><sw-logo :size="50" /></div>
      </el-col>
      <el-col :span="10" class="menu">
        <el-dropdown trigger="click" size="medium" @command="menuItemClicked">
          <span class="el-dropdown-link menu-button" @click="menuClicked">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="menu-actions">
            <el-dropdown-item command="action-1">Action 1</el-dropdown-item>
            <el-dropdown-item command="action-2">Action 2</el-dropdown-item>
            <el-dropdown-item command="action-3">Action 3</el-dropdown-item>
            <el-dropdown-item command="action-4">Action 4</el-dropdown-item>
            <el-dropdown-item command="logout" divided>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { Button, Col, Dropdown, DropdownMenu, DropdownItem, Icon, Logo, Header, Row } from 'ui-toolkit'

export default {
  name: 'Header',
  components: {
    Button,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Logo,
    Header,
    Row
  },
  props: {
    emailHash: {
      type: String
    },
    username: {
      type: String,
      default: 'Guest'
    },
    actionCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    actionsTaken () {
      const count = parseInt(this.actionCount)

      if (count === 0) {
        return 'No Action <br /> Taken'
      } else if (count === 1) {
        return 'One Action <br /> Taken'
      } else {
        return `${count.toLocaleString()} Actions <br /> Taken`
      }
    }
  },
  methods: {
    accountClicked() {
      this.$emit('accountClicked')
    },
    logoClicked() {
      this.$emit('logoClicked')
    },
    menuClicked() {
      this.$emit('menuClicked')
    },
    menuItemClicked(command) {
      this.$emit('menuItemClicked', command)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0;
  margin: 0;
  width: 100%;
  line-height: 60px;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #ededed;

  .el-row {
    margin: 0;
  }

  .logo {
    height: 60px;
    overflow: hidden;

    svg {
      margin: 5px 0;
    }
  }

  .account {
    text-align: left;
    line-height: 14px;
    cursor: pointer;

    .user-avatar {
      padding: 8px 0 8px 10px;
      display: inline-block;

      .avatar {
        border-radius: 50%;
      }
    }

    .user-details {
      display: inline-block;
      line-height: 10px;
      font-size: 10px;
      text-transform: uppercase;
      margin-left: 6px;
      position: relative;
      top: -8px;
      color: #666;

      strong {
        color: #000;
        display: block;
      }
    }
  }

  .menu {
    text-align: right;
  }

  .menu-button {
    color: #000;
    font-size: 20px;
    cursor: pointer;
    width: 40px;
    text-align: center;
    display: inline-block;

    &:focus, &:active {
      outline: none;
    }
  }
}
.menu-actions {
  margin-top: 0;

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #222;
    color: #FFF;
  }
}
</style>
