<template>
  <div class="my-impact-details">
    <div class="totals">
      {{ total }}
      <font-awesome-icon color='#000000' :icon='getIcon' class='icon'></font-awesome-icon>
    </div>
    <div class="summary">
      {{ getSummary }}
    </div>
    <div class="divider"></div>
    <div class="activity-details">
      <ul>
        <li v-for="(activity, index) in impactDetails" :key="index">
          {{ activity.title }}

          <span class="date">
            {{ activity.date | moment('MMM D') }}
          </span>
        </li>
      </ul>
    </div>
    <div class="view-less">
      <el-button class="less-button" size="medium" @click="lessClicked">
        Less
      </el-button>
    </div>
  </div>
</template>

<script>
import { Button, FontAwesomeIcon } from 'ui-toolkit'
import { actionIcon, actionSummary } from '../../../../util'

export default {
  name: 'MyImpactDetails',
  props: {
    impactDetails: {
      type: Array,
      default: () => ([])
    },
    type: {
      type: String,
      default: null
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getIcon () {
      return actionIcon('fas', this.type)
    },
    getSummary () {
      return actionSummary(this.type)
    }
  },
  methods: {
    lessClicked () {
      this.$emit('hideDetails')
    }
  },
  components: {
    Button,
    FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
.my-impact-details {
  height: 100%;
  padding: 0 30px 20px 30px;

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

  .activity-details {
    text-transform: uppercase;
    font-size: 10px;
    height: calc(100% - 75px);
    overflow: auto;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        width: 100%;
        line-height: 26px;
        display: block;

        .date {
          float: right;
        }
      }
    }
  }

  .less-button {
    background: #000;
    color: #FFF;
    width: 100%;
    text-transform: uppercase;
    font-weight: 600;
  }
}
</style>
