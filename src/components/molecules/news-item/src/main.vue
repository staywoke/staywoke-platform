<template>
  <a class="news-article" target="_blank" rel="noopener noreferrer" :href="getUrl">
    <div class="image" :style="{ backgroundImage: backgroundImage }"></div>
    <div class="summary">
      <div class="title">
        {{ articleTitle }}
      </div>
      <div class="details">
        <div class="source">
          From {{ article.source }}
        </div>
        <div class="date">
          {{ article.date | moment('MMMM Do') }}
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'NewsArticle',
  props: {
    article: {
      type: Object,
      default: () => ({
        image: null,
        title: null,
        source: null,
        summary: null,
        author: null,
        date: null,
        url: '#'
      })
    }
  },
  computed: {
    getUrl() {
      return (this.article.url) ? this.article.url : '#'
    },
    backgroundImage() {
      return `url('${this.article.image}')`
    },
    articleTitle() {
      const max = 90

      if (this.article.title.length <= max) {
        return this.article.title;
      }

      var subString = this.article.title.substr(0, max-1);

      return subString.substr(0, subString.lastIndexOf(' ')) + ' ...';
    }
  },
  methods: {
    feedClicked() {
      this.$emit('feedClicked')
    },
    actionCenterClicked() {
      this.$emit('actionCenterClicked')
    },
    myImpactClicked() {
      this.$emit('myImpactClicked')
      this.$emit('hideDetails')
    }
  }
}
</script>

<style lang="scss" scoped>
.news-article {
  color: #000;
  text-decoration: none;

  .image {
    width: 65px;
    height: 65px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    float: left;
  }

  .summary {
    display: inline-block;
    width: calc(100% - 65px);
    height: 65px;
    float: left;
    padding-left: 8px;
    position: relative;

    .title {
      font-weight: 900;
      line-height: 16px;
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
