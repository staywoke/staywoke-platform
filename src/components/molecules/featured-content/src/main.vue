<template>
  <div class='featured-content'>
    <h2>{{ title }}</h2>
    <tweet class="tweet" v-if="id" :id="id" :options="{ cards: 'hidden', conversation: 'none' }" error-message="THIS TWEET COULD NOT BE LOADED" error-message-class="loading">
      <div class="loading">Loading ...</div>
    </tweet>
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

<style lang="scss" scoped>
.featured-content {
  .tweet {
    text-align: center;
    color: #999;
    font-size: 12px;
    margin: 0 auto;

    .twitter-tweet {
      max-width: 100% !important;
      width: 100% !important;
    }
  }

  .loading {
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
