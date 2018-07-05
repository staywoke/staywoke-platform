<template>
  <div class='action'>
    <div class='location'>
      <span class='stateface' :class='locationIcon'></span>
      <span class='name'>
        {{ locationName }}
      </span>
    </div>
    <div class='summary'>
      <div class='title'>
        {{ actionTitle }}
      </div>
      <div class='action-type'>
        <font-awesome-icon color='#FFFFFF' :icon='getIcon' class='button-icon'></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes, actionIcon, actionSummary, stateCodes, stateList } from '../../../../util'

export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      default: () => ({
        type: null,
        title: null,
        national: false,
        state: null
      })
    }
  },
  computed: {
    locationName() {
      if (this.action.national) {
        return 'National'
      } else {
        return stateList[this.action.state.toUpperCase()]
      }
    },
    locationIcon() {
      if (this.action.national) {
        return 'stateface-us'
      } else {
        return 'stateface-' + this.action.state.toLowerCase()
      }
    },
    getIcon() {
      return actionIcon('fas', this.action.type)
    },
    actionTitle() {
      const max = 90

      if (this.action.title.length <= max) {
        return this.action.title;
      }

      var subString = this.action.title.substr(0, max-1);

      return subString.substr(0, subString.lastIndexOf(' ')) + ' ...';
    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.action {
  position: relative;

  .location {
    width: 90px;
    height: 65px;
    background: #111;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    float: left;
    text-align: center;

    .stateface {
      color: #00bffa;
      font-size: 40px;
      line-height: 24px;
      display: block;
      margin-top: 14px;
    }

    .name {
      color: #FFF;
      white-space: nowrap;
      font-size: 11px;
      font-weight: 900;
    }
  }

  .summary {
    display: inline-block;
    width: calc(100% - 90px);
    height: 65px;
    float: left;
    padding-left: 10px;
    position: relative;

    .title {
      font-weight: 900;
      line-height: 16px;
      padding-right: 25px;
      padding-top: 8px;
    }

    .action-type {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 40px 40px;
      border-color: transparent transparent #000000 transparent;
      position: absolute;
      bottom: 0;
      right: 0;

      svg {
        position: absolute;
        right: 7px;
        top: 21px;
        width: 12px;
        height: 12px;
      }
    }
  }

  .details {
    font-size: 10px;
    text-transform: uppercase;
    line-height: 10px;
    color: #666;
    position: absolute;
    bottom: 0;
    width: 100%;

    .date {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #999;
    }
  }
}
</style>
