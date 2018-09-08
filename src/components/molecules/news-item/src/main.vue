<template>
  <article itemscope itemtype="http://schema.org/NewsArticle">
    <meta itemprop="image" :content="article.imageUrl" />
    <meta itemprop="author" :content="article.source" />
    <meta itemprop="dateModified" :content="article.addedDate" />
    <meta itemprop="datePublished" :content="article.addedDate" />
    <meta itemprop="mainEntityOfPage" :content="article.articleUrl" />
    <meta itemprop="url" :content="getShareUrl" />

    <span itemprop="publisher" itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" :content="article.source" />
      <span itemprop="logo" itemscope itemtype="http://schema.org/ImageObject">
        <meta itemprop="url" content="https://staywoke-platform.s3.amazonaws.com/icons/icon-72.png" />
      </span>
    </span>

    <router-link :to="{ name: 'news', params: { slug: article.slug } }" class="news-article" itemprop="url">
      <div class="image" :style="{ backgroundImage: backgroundImage }"></div>
      <div class="summary">
        <div class="title" itemprop="headline">
          {{ articleTitle }}
        </div>
        <div class="details">
          <div class="source">
            From {{ article.source }}
          </div>
          <div class="date">
            {{ article.addedDate | moment('MMMM Do') }}
          </div>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'NewsArticle',
  props: {
    article: {
      type: Object,
      default: () => ({
        addedDate: null,
        articleUrl: '#',
        imageUrl: null,
        slug: null,
        source: null,
        summary: null,
        title: null
      })
    }
  },
  computed: {
    getUrl () {
      return (this.article.articleUrl) ? this.article.articleUrl : '#'
    },
    getShareUrl () {
      return `${window.location.protocol}//${window.location.host}/news/${this.article.slug}`
    },
    backgroundImage () {
      return `url('${this.article.imageUrl}')`
    },
    articleTitle () {
      const max = 90
      let title = (this.article.title)
        ? this.article.title
        : 'No Title Provided'

      if (title.length <= max) {
        return title
      }

      var subString = title.substr(0, max - 1)

      return subString.substr(0, subString.lastIndexOf(' ')) + ' ...'
    }
  },
  methods: {
    feedClicked () {
      this.$emit('feedClicked')
    },
    actionCenterClicked () {
      this.$emit('actionCenterClicked')
    },
    myImpactClicked () {
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

@media only screen and (max-width: 320px) {
  .news-article {
    .summary {
      font-size: 14px;
    }
  }
}
</style>
