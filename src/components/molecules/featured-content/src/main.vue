<template>
  <div class='featured-content'>
    <h2>{{ title }}</h2>
    <Tweet
      :id="id"
      :options="{ cards: 'hidden', conversation: 'none' }"
      class="tweet"
      error-message="THIS TWEET COULD NOT BE LOADED"
    />
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
  name: 'FeaturedContent',
  props: {
    id: {
      type: String,
      default: null,
      validator: function (id) {
        const reg = /^[0-9]+$/
        return (reg.test(id))
      }
    },
    title: {
      type: String,
      default: 'Featured Content'
    }
  },
  components: {
    Tweet
  }
}
</script>

<style lang='scss' scoped>
.featured-content {
  .tweet {
    text-align: center;
    color: #999;
    font-size: 12px;
  }

  h2 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: normal;
    margin: 0;
    color: #333;
  }
}
</style>
