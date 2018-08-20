<template>
  <div class="news">
    <h2>{{ title }}</h2>
    <ul class="news">
      <li v-for="(article, index) in articles" :key="index" v-if="index < maxNews">
        <sw-news-item :article="article" />
      </li>
    </ul>
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
      default: 3
    },
    title: {
      type: String,
      default: 'News Worth Reading'
    }
  },
  data () {
    return {
      maxNews: this.max
    }
  },
  mounted () {
    this.maxNews = (document.body.clientWidth < 1024) ? 3 : Math.floor((document.body.clientHeight - 100) / 85)
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
    display: table-cell;

    li {
      text-align: left;
      padding: 10px;
      height: 85px;
      border-bottom: 1px solid #f2f2f2;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
