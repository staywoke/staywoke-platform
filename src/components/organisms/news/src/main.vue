<template>
  <div class="news">
    <h2>{{ title }}</h2>
    <ul class="news">
      <li v-for="(article, index) in articles" :key="index" v-if="index < max">
        <sw-news-article :article="article" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'News',
  props: {
    articles: {
      type: Array,
      default: () => ([])
    },
    max: {
      type: Number,
      default: 3
    },
    title: {
      type: String,
      default: 'News Worth Reading'
    }
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

    li {
      text-align: left;
      padding: 10px;
      height: 85px;
      border-bottom: 1px solid #EEE;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
