<template>
  <div class="news">
    <h2>{{ title }}</h2>

    <ul class="news">
      <li v-for="(article, index) in articles" :key="index" v-if="!errorMessage && index < max">
        <sw-news-item :article="article" />
      </li>
    </ul>

    <div class="error-message" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import NewsItem from '@/components/molecules/news-item'

export default {
  name: 'News',
  props: {
    articles: {
      type: Array,
      default: () => ([])
    },
    max: {
      type: Number,
      default: 20
    },
    title: {
      type: String,
      default: 'News Worth Reading'
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  components: {
    NewsItem
  }
}
</script>

<style lang="scss" scoped>
.news {
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
    width: 100%;
    display: block;

    li {
      text-align: left;
      padding: 10px;
      height: 85px;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
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
