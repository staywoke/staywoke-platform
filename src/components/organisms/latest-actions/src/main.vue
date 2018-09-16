<template>
  <div class="latest-actions">
    <h2>{{ title }}</h2>

    <ul>
      <li v-for="(action, index) in actions" :key="index" v-if="!errorMessage && index < max">
        <sw-action :action="action" />
      </li>
    </ul>

    <div class="error-message" v-if="errorMessage">
      {{ errorMessage }}
    </div>
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
      default: 20
    },
    title: {
      type: String,
      default: 'Latest Actions'
    },
    errorMessage: {
      type: String,
      default: null
    }
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

  .error-message {
    height: 200px;
    background-color: rgb(255, 255, 255);
    max-width: 520px;
    overflow: hidden;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(225, 232, 237);
    border-image: initial;
    border-radius: 5px;
    text-transform: uppercase;
    line-height: 200px;
    margin-top: 10px;
    text-align: center;
    color: #999;
  }
}
</style>
