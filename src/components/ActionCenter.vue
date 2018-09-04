<template>
  <transition name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
    <div class="action-center">
      <h2 :style="{ backgroundImage: 'url(' + require('@/assets/action-center.jpg') + ')' }">
        Take Action<br />on Policy.
      </h2>
      <ul class="actions">
        <li v-for="(action, index) in actions" :key="index">
          <sw-action-item :item="action" @actionItemClicked="actionItemClicked" />
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mockActionItems } from '../mocks'

import ActionItem from '@/components/atoms/action-item'

export default {
  name: 'Documentation',
  data () {
    return {
      actions: []
    }
  },
  created () {
    this.getActionItems()
  },
  methods: {
    getActionItems () {
      this.actions = mockActionItems
    },
    actionItemClicked () {

    }
  },
  components: {
    ActionItem
  }
}
</script>

<style lang="scss" scoped>
.action-center {
  margin: 0;
  padding: 0;

  h2 {
    background-position: center center;
    background-repeat: none;
    background-size: cover;
    color: #FFF;
    padding: 20px;
    margin: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      border-bottom: 1px solid #DDD;
      padding: 6px;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
@media (min-width: 1024px) {
  .action-center {
    background-color: #f2f2f2;
  }

  .action-center ul {
    max-width: 800px;
    margin: 0 auto;
    border-left: 1px solid #DDD;
    border-right: 1px solid #DDD;
    border-bottom: 1px solid #DDD;
    background: #FFF;
  }
}
</style>
