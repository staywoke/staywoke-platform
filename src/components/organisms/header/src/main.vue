<template>
  <el-header class="header">
    <el-row>
      <el-col :span="10">
        <div class="desktop-only logo" @click="logoClicked">
          <router-link :to="{ name: 'index' }">
            <sw-logo :size="50" />
          </router-link>
        </div>

        <div class="mobile-only account" v-if="loggedIn">
          <div class="user-avatar" @click="accountClicked">
            <img class="avatar" :src="'https://www.gravatar.com/avatar/' + emailHash + '?s=44'" v-if="emailHash" />
            <span class="avatar" v-if="!emailHash">{{ initials }}</span>
          </div>
          <div class="user-details" @click="accountClicked">
            <strong>{{ username }}</strong>
            <span v-html="actionsTaken"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="desktop-only account" v-if="loggedIn">
          <div class="user-avatar" @click="accountClicked">
            <img class="avatar" :src="'https://www.gravatar.com/avatar/' + emailHash + '?s=44'" v-if="emailHash" />
            <span class="avatar" v-if="!emailHash">{{ initials }}</span>
          </div>
          <div class="user-details" @click="accountClicked">
            <strong>{{ username }}</strong>
            <span v-html="actionsTaken"></span>
          </div>
        </div>

        <div class="mobile-only logo" @click="logoClicked">
          <router-link :to="{ name: 'index' }">
            <sw-logo :size="50" />
          </router-link>
        </div>
      </el-col>
      <el-col :span="10" class="menu">
        <div class="desktop-only">
          <a @click="myImpactClicked" v-if="loggedIn">
            <span>
              My Impact
            </span>
          </a>

          <router-link :to="{ name: 'login' }" v-if="!loggedIn">
            <span>
              Login
            </span>
          </router-link>

          <router-link :to="{ name: 'register' }" v-if="!loggedIn">
            <span>
              Register
            </span>
          </router-link>

          <router-link :to="{ name: 'logout' }" v-if="loggedIn">
            <span>
              Logout
            </span>
          </router-link>
        </div>

        <el-dropdown class="mobile-only" trigger="click" size="medium" @command="menuItemClicked">
          <span class="el-dropdown-link menu-button" @click="menuClicked">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="menu-actions">
            <router-link :to="{ name: 'login' }" v-if="!loggedIn">
              <el-dropdown-item command="login">
                Login
              </el-dropdown-item>
            </router-link>

            <router-link :to="{ name: 'register' }" v-if="!loggedIn">
              <el-dropdown-item command="register">
                Register
              </el-dropdown-item>
            </router-link>

            <router-link :to="{ name: 'logout' }" v-if="loggedIn">
              <el-dropdown-item command="logout" divided>
                Logout
              </el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import Button from 'ui-toolkit/src/components/atoms/button'
import DropdownItem from 'ui-toolkit/src/components/atoms/dropdown-item'
import Logo from 'ui-toolkit/src/components/atoms/logo'

import Col from 'ui-toolkit/src/components/molecules/col'
import Dropdown from 'ui-toolkit/src/components/molecules/dropdown'
import DropdownMenu from 'ui-toolkit/src/components/molecules/dropdown-menu'
import Row from 'ui-toolkit/src/components/molecules/row'

import Header from 'ui-toolkit/src/components/organisms/header'

import { EventBus } from '../../../../event-bus'

export default {
  name: 'Header',
  props: {
    emailHash: {
      type: String
    },
    username: {
      type: String,
      default: 'Guest'
    }
  },
  data () {
    return {
      loggedIn: this.$store.getters.isLoggedIn,
      initials: this.$store.getters.getUserInitials,
      actionCount: this.$store.getters.getImpactCount
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
  created () {
    let self = this

    EventBus.$on('USER_LOGIN', () => {
      self.loggedIn = true
    })

    EventBus.$on('USER_LOGOUT', () => {
      self.loggedIn = false
    })

    EventBus.$on('IMPACT_UPDATED', () => {
      self.actionCount = this.$store.getters.getImpactCount
    })
  },
  methods: {
    accountClicked () {
      this.$emit('accountClicked')
    },
    logoClicked () {
      this.$emit('logoClicked')
    },
    menuClicked () {
      this.$emit('menuClicked')
    },
    menuItemClicked (command) {
      this.$emit('menuItemClicked', command)
    },
    myImpactClicked () {
      this.$emit('myImpactClicked')
      this.$emit('hideDetails')
    }
  },
  components: {
    Button,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Logo,
    Header,
    Row
  }
}
</script>

<style lang="scss" scoped>
.desktop-only {
  display: none;
}

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

    &.mobile-only {
      margin-left: 10px;
    }

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
        width: 44px;
        height: 44px;
      }

      span.avatar {
        display: inline-block;
        background: #111;
        color: #FFF;
        text-align: center;
        line-height: 44px;
      }
    }

    .user-details {
      display: inline-block;
      line-height: 10px;
      font-size: 10px;
      text-transform: uppercase;
      margin-left: 6px;
      position: relative;
      top: 7px;
      color: #666;

      strong {
        color: #000;
        display: block;
      }
    }
  }

  .menu {
    text-align: right;

    .mobile-only.el-dropdown {
      position: absolute;
      right: 0;
    }
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

@media (min-width: 1024px) {
  .desktop-only {
    display: block;
    padding-right: 14px;
  }
  .mobile-only {
    display: none;
  }
  .header {
    position: relative;

    .account {
      position: absolute;
      left: 80px;
    }

    .logo {
      margin-left: 14px;
    }

    .menu {
      text-align: right;
      position: absolute;
      right: 0;

      a {
        display: inline-block;
        color: #000;
        text-decoration: none;
        text-transform: uppercase;
        margin-left: 16px;
        font-size: 14px;
        transition: color 0.25s;
        cursor: pointer;

        &.router-link-exact-active, &:hover {
          color: #de0000;
        }
      }
    }
  }
}
</style>
