<template>
  <sw-page-template class="page-home" :impact-list="impactList" :impact-details="impactDetails">
    <template slot="content">
      <sw-news :articles="news" />
      <sw-featured-content :id="tweet" />
      <sw-latest-actions :actions="actions" />
    </template>
  </sw-page-template>
</template>

<script>
export default {
  name: 'PageHome',
  props: {
    news: {
      type: Array,
      default: () => ([])
    },
    actions: {
      type: Array,
      default: () => ([])
    },
    impactList: {
      type: Array,
      default: () => ([])
    },
    impactDetails: {
      type: Array,
      default: () => ([])
    },
    tweet: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.page-home {
  .main-content {
    background-color: #f2f2f2;

    .news {
      margin-top: 6px;
      padding: 10px;

      ul {
        padding: 0;
        margin: 10px 0 0 0;
        background: #FFF;
        border-radius: 4px;

        li {
          padding-right: 16px;
        }
      }
    }

    .featured-content {
      padding: 10px;
    }

    .latest-actions {
      padding: 0 10px 10px 10px;

      ul {
        li {
          background: #FFF;
        }
      }
    }
  }
}
body {
  position: relative;

  .el-dropdown-menu {
    position: absolute;
    width: 100%;
    top: 60px !important;
    left: 0 !important;
    border: none !important;
    border-radius: none !important;

    .popper__arrow {
      display: none;
    }
  }
}
</style>
