<template>
  <div class='action-item'>
    <router-link :to="{ name: 'actions', params: { slug: item.slug } }">
      <el-button type="text" @click="handleClick" class="item-link">
        <span>{{ item.title }}</span>
        <font-awesome-icon color='#000000' :icon='["fas", "chevron-right"]' class='list-icon' />
      </el-button>
    </router-link>
  </div>
</template>

<script>
import { Button } from 'ui-toolkit/src/components/atoms/button'

export default {
  name: 'ActionItem',
  props: {
    item: {
      type: Object,
      default: () => ({
        title: null,
        slug: null
      }),
      validator: function (item) {
        return (item.title.length > 0)
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('actionItemClicked')
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.action-item {
  padding: 0 15px;

  .item-link {
    width: 100%;
    border: none;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: #000;

    span {
      float: left;
    }

    .list-icon {
      float: right;
    }
  }
}
</style>
