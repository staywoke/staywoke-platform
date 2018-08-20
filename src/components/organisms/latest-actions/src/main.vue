<template>
  <div class="latest-actions">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="(action, index) in actions" :key="index" v-if="index < maxAction">
        <sw-action :action="action" />
      </li>
    </ul>
  </div>
</template>

<script>
import Action from '@/components/molecules/action'

export default {
  name: 'LatestActions',
  props: {
    actions: {
      type: Array,
      default: () => ([])
    },
    max: {
      type: Number,
      default: 3
    },
    title: {
      type: String,
      default: 'Latest Actions'
    }
  },
  data () {
    return {
      maxAction: this.max
    }
  },
  mounted () {
    this.maxAction = (document.body.clientWidth < 1024) ? 3 : Math.floor((document.body.clientHeight - 100) / 75)
  },
  components: {
    Action
  }
}
</script>

<style lang="scss" scoped>
.latest-actions {
  h2 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: normal;
    margin: 0;
    color: #333;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 8px;

    li {
      text-align: left;
      height: 65px;
      border: 1px solid #EEE;
      margin-bottom: 8px;
      border-radius: 4px;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
