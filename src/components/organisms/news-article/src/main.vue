<template>
  <article class="news-article" itemscope itemtype="http://schema.org/NewsArticle">
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

    <div class="head">
      <span>{{ getSource }}</span>

      <router-link :to="{ name: 'index', params: { back: true } }">
        <el-button class="back-button" size="mini" @click="backClicked">&lsaquo; Back</el-button>
      </router-link>
    </div>

    <div class="image" :style="{ backgroundImage: backgroundImage }">
      <div class="read" v-if="article.read">
        <i class="el-icon-check"></i>
      </div>
    </div>

    <div class="content">

      <div class="title" itemprop="headline">
        {{ article.title }}
      </div>

      <div class="author">
        By {{ getSource }}

        <span class="date">
          {{ article.addedDate | moment('MMM D') }}
        </span>
      </div>

      <div class="summary">
        {{ article.summary }}
      </div>
    </div>

    <a class="read-more" target="_blank" rel="noopener noreferrer" :href="getUrl" @click="readMoreClicked">Read More</a>
  </article>
</template>

<script>
import { Button } from 'ui-toolkit'

export default {
  name: 'NewsArticle',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    backgroundImage () {
      return `url('${this.article.imageUrl}')`
    },
    getUrl () {
      return (this.article.url) ? this.article.url : '#'
    },
    getShareUrl () {
      return `${window.location.protocol}//${window.location.host}/news/${this.article.slug}`
    },
    getSource () {
      if (this.article.source) {
        return this.article.source
      } else if (this.article.resourceUrl) {
        return (new URL(this.article.articleUrl)).hostname.replace('www.', '')
      } else {
        return 'Unknown'
      }
    }
  },
  methods: {
    backClicked () {
      this.$emit('backClicked')
    },
    readMoreClicked () {
      this.$emit('readMoreClicked')
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.news-article {
  height: 100%;

  .head {
    text-transform: uppercase;
    font-size: 12px;
    color: #666;
    margin-bottom: 14px;
    line-height: 20px;
    height: 16px;

    .back-button {
      float: left;
      background-color: #000;
      color: #FFF;
      border: none;
      padding: 4px 10px;
      text-transform: uppercase;
      font-weight: 900;
      border-radius: none;
      font-size: 12px;
      line-height: 13px;
    }

    span {
      float: right;
      line-height: 24px;
    }
  }

  .image {
    width: 100%;
    height: 130px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 4px 4px 0 0;
    margin: 0;
    padding: 0;
    position: relative;

    .read {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 50px 50px 0;
      border-color: transparent rgba(0,0,0,0.75) transparent transparent;
      position: absolute;
      top: 0;
      right: 0;
      color: #FFF;

      i {
        position: absolute;
        left: 25px;
        top: 8px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }

  .content {
    border-radius: 0 0 4px 4px;
    border: 1px solid #cfcfcf;
    border-top: none;
    background: #FFF;
    margin: 0;
    padding: 20px 16px;
    margin-bottom: 10px;

    .title {
      font-weight: 600;
      margin-bottom: 14px;
    }

    .author {
      text-transform: uppercase;
      font-size: 11px;
      color: #666;

      .date {
        float: right;
      }
    }

    .summary {
      white-space: pre-line;
      font-size: 14px;
      line-height: 18px;
    }
  }

  .read-more {
    background: #000;
    color: #FFF;
    width: 100%;
    text-transform: uppercase;
    font-weight: 600;
    width: 100%;
    text-decoration: none;
    display: block;
    text-align: center;
    padding: 6px 0;
    border-radius: 4px;
    margin-bottom: 10px;
  }
}
@media (min-width: 1024px) {
  .news-article {
    max-width: 800px;
    margin: 0 auto;

    .image {
      height: 300px;
    }
  }
}
</style>
