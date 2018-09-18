<template>
  <div class='impact'>
    <div class="totals">
      {{ impact.total }}
      <font-awesome-icon color='#000000' :icon='getIcon' class='icon' />
    </div>
    <div class="summary">
      {{ getSummary }}
    </div>
    <div class="divider"></div>
    <div class="recent-activity">
      <span class="title" v-html="getLastAction"></span>
      <span class="date">{{ impact.lastDate | moment('MMMM Do') }}</span>
    </div>
    <!-- <div class="view-more">
      <el-button class="more-button" size="medium" @click="moreClicked">
        More
      </el-button>
    </div> -->
  </div>
</template>

<script>
import { Button, FontAwesomeIcon } from 'ui-toolkit'
import { actionTypes, actionIcon, actionSummary } from '../../../../util'

export default {
  name: 'Impact',
  props: {
    impact: {
      type: Object,
      default: () => ({
        type: null,
        total: 0,
        name: null,
        lastDate: null
      }),
      validator: function (impact) {
        return (actionTypes.indexOf(impact.type) !== -1)
      }
    }
  },
  computed: {
    getIcon () {
      return actionIcon('fas', this.impact.type)
    },
    getSummary () {
      return actionSummary(this.impact.type)
    },
    getLastAction () {
      return `<b>Latest:</b>&nbsp; ${this.impact.name}`
    }
  },
  methods: {
    moreClicked () {
      this.$emit('moreClicked', this.impact.type)
    }
  },
  components: {
    Button,
    FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
.impact {
  .totals {
    font-weight: 600;
    font-size: 32px;
    text-align: center;

    .icon {
      font-size: 16px;
      position: relative;
      bottom: 5px;
    }
  }

  .summary {
    text-transform: uppercase;
    text-align: center;
    font-size: 12px;
    margin-bottom: 6px;
  }

  .divider {
    height: 1px;
    margin: 0 auto;
    background: #000;
    max-width: 33%;
  }

  .recent-activity {
    text-transform: uppercase;
    padding: 6px 0;
    font-size: 10px;
    color: #666;
    display: inline-block;
    width: 100%;

    .title {
      max-width: calc(100% - 100px);
      float: left;
    }

    .date {
      float: right;
    }
  }

  .more-button {
    background: #000;
    color: #FFF;
    width: 100%;
    text-transform: uppercase;
    font-weight: 600;
  }
}
</style>
