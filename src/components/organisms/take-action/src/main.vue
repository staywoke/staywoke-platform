<template>
  <div class="take-action">
    <div class="head">
      <span>{{ getHeader }}</span>

      <router-link :to="{ name: 'index', params: { back: true } }">
        <el-button class="back-button" size="mini" @click="backClicked">&lsaquo; Back</el-button>
      </router-link>
    </div>

    <div class="image" :style="{ backgroundImage: backgroundImage }">
      <div class="action-title">
        {{ getAction }}
        <font-awesome-icon color='#FFFFFF' :icon='getIcon' class='icon'></font-awesome-icon>
      </div>
    </div>

    <div class="content">

      <div class="title" v-if="action.name">
        {{ action.name }}
      </div>

      <div class="author">
        By {{ getOrganization }}
      </div>

      <div class="summary" v-if="action.summary">
        {{ action.summary }}
      </div>

      <div class="call-to-action" v-if="action.assignment">
        <b>TAKE ACTION:</b>&nbsp; {{ action.assignment }}
      </div>

      <div class="summary" v-if="action.why">
        {{ action.why }}
      </div>

      <el-alert
        class="error"
        type="error"
        title="Calling Currently Unavailable"
        description="Phone banking hours are between 11am-9pm EST every day. Please come back tomorrow to contact more voters!"
        :closable="false"
        show-icon
        v-if="!isActive"
      />
    </div>

    <div class="action-buttons">
      <a class="read-more" :class="{ 'full-width': !this.action.phoneNumber || !isActive }" target="_blank" rel="noopener noreferrer" :href="action.resourceUrl" @click="readMoreClicked" v-if="this.action.resourceUrl">
        Read More
      </a>
      <a class="read-more" :class="{ 'full-width': !this.action.resourceUrl }" :href="'tel:' + action.phoneNumber" @click="actionClicked" v-if="this.action.phoneNumber && isActive">
        {{ getButton }}
      </a>
    </div>
  </div>
</template>

<script>
import { Alert, Button, FontAwesomeIcon } from 'ui-toolkit'

import { AMZ } from '../../../../aws'
import { actionIcon, actionLabel, actionButton } from '../../../../util'

export default {
  name: 'TakeAction',
  props: {
    action: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    backgroundImage () {
      // TODO: Make sure our images are secured over HTTPS to prevent SSL invalidation
      const secureImage = this.action.imageUrl.replace('http://', 'https://')
      return `url('${secureImage}')`
    },
    getIcon () {
      return actionIcon('fas', this.action.type)
    },
    getHeader () {
      return (this.action.national) ? 'Take Action' : 'Take Local Action'
    },
    getUrl () {
      return (this.action.resourceUrl) ? this.action.resourceUrl : '#'
    },
    getAction () {
      return actionLabel(this.action.type)
    },
    getButton () {
      return actionButton(this.action.type)
    },
    getOrganization () {
      if (this.action.organization) {
        return this.action.organization
      } else if (this.action.resourceUrl) {
        return (new URL(this.action.resourceUrl)).hostname.replace('www.', '')
      } else {
        return 'Unknown'
      }
    },
    isActive () {
      if (this.action.type === 'call') {
        // eslint-disable-next-line
        Date.prototype.stdTimezoneOffset = function () {
          var jan = new Date(this.getFullYear(), 0, 1)
          var jul = new Date(this.getFullYear(), 6, 1)
          return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
        }

        // eslint-disable-next-line
        Date.prototype.isDstObserved = function () {
          return this.getTimezoneOffset() < this.stdTimezoneOffset()
        }

        const now = new Date()
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
        const offset = (now.isDstObserved()) ? -4 : -5
        const easternTime = new Date(utc + (3600000 * offset))

        // Call Center is only active between the hours of 10AM - 9PM ET
        if (easternTime.getHours() < 10 || easternTime.getHours() > 20) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    backClicked () {
      this.$emit('backClicked')
    },
    readMoreClicked () {
      this.$emit('readMoreClicked')
    },
    actionClicked () {
      this.$emit('actionClicked')

      if (this.$store.getters.isLoggedIn) {
        AMZ.Lambda.fetch('updateUserImpact', {
          type: 'addArticle',
          resourceId: this.action.id
        })
      }
    }
  },
  components: {
    Alert,
    Button,
    FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
.take-action {
  .head {
    text-transform: uppercase;
    font-size: 12px;
    color: #666;
    margin-bottom: 14px;
    line-height: 20px;
    height: 16px;

    .back-button {
      float: left;
      background-color: #000;
      color: #FFF;
      border: none;
      padding: 4px 10px;
      text-transform: uppercase;
      font-weight: 900;
      border-radius: none;
      font-size: 12px;
      line-height: 13px;
    }

    span {
      float: right;
      line-height: 24px;
    }
  }

  .image {
    width: 100%;
    height: 130px;
    background-color: #999;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 4px 4px 0 0;
    margin: 0;
    padding: 0;
    position: relative;

    .action-title {
      position: absolute;
      bottom: 0;
      left: 0;
      color: #FFF;
      font-weight: 900;
      text-transform: uppercase;
      padding: 14px 20px;
      text-shadow: 1px 1px 1px rgba(0,0,0,0.5);

      svg {
        -webkit-filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      }
    }
  }

  .content {
    border-radius: 0 0 4px 4px;
    border: 1px solid #cfcfcf;
    border-top: none;
    background: #FFF;
    margin: 0;
    padding: 20px 16px;
    margin-bottom: 10px;

    .title {
      font-weight: 600;
      margin-bottom: 14px;
    }

    .author {
      text-transform: uppercase;
      font-size: 11px;
      color: #666;

      .date {
        float: right;
      }
    }

    .summary {
      white-space: pre-line;
      font-size: 14px;
      line-height: 18px;
    }

    .call-to-action {
      margin-top: 14px;
      white-space: pre-line;
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;

      b {
        color: #de0000;
      }
    }
  }

  .action-buttons {
    height: 30px;

    a {
      width: calc(50% - 5px);
      display: inline-block;
      float: left;

      &.full-width {
        width: 100%;
      }

      &:not(.full-width):nth-child(1) {
        margin-right: 5px;
      }

      &:not(.full-width):nth-child(2) {
        margin-left: 5px;
      }
    }
  }

  .el-alert {
    margin-top: 20px;
  }

  .read-more {
    background: #000;
    color: #FFF;
    width: 100%;
    text-transform: uppercase;
    font-weight: 600;
    width: 100%;
    text-decoration: none;
    display: block;
    text-align: center;
    padding: 6px 0;
    border-radius: 4px;
  }
}
@media (min-width: 1024px) {
  .take-action {
    max-width: 800px;
    margin: 0 auto;

    .image {
      height: 300px;
    }
  }
}

// CSS for Widget
@media only screen and (max-width: 319px) {
  .take-action {
    .head span {
      display: none !important;
    }
  }
}
</style>
