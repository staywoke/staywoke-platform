<template>
  <div class="page">
    <sw-header
      email-hash="e1d91ee5412c6334f2123b747ca0f1d2"
      username="Peter"
      :action-count="18"
      @accountClicked="accountClicked"
      @logoClicked="logoClicked"
      @menuClicked="menuClicked"
      @menuItemClicked="menuItemClicked"
    />

    <div class="main-content">
      <slot name="content"></slot>
    </div>

    <sw-drawer
      :opened="drawerOpen"
      :impact-list="impactList"
      :impact-details="impactDetails"
      @closeDrawer="closeDrawer"
      @showDetails="showDetails"
      @hideDetails="hideDetails"
    />

    <sw-footer
      :feed-updated="feedUpdated"
      @feedClicked="feedClicked"
      @actionCenterClicked="actionCenterClicked"
      @myImpactClicked="myImpactClicked"
    />
  </div>
</template>

<script>
import { trackEvent } from '../../../../analytics'

import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import Drawer from '@/components/organisms/drawer'

export default {
  name: 'PageTemplate',
  props: {
    impactList: {
      type: Array,
      default: () => ([])
    },
    impactDetails: {
      type: Array,
      default: () => ([])
    },
    feedUpdated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      drawerOpen: false
    }
  },
  methods: {
    accountClicked () {
      this.drawerOpen = !this.drawerOpen
      trackEvent('Header Nav', 'Click', 'Account')
    },
    logoClicked () {
      this.drawerOpen = false
      document.querySelector('.main-content').scrollTop = 0
      trackEvent('Header Nav', 'Click', 'Logo')
    },
    menuClicked () {
      this.drawerOpen = false
      trackEvent('Header Nav', 'Click', 'Menu')
    },
    menuItemClicked (item) {
      trackEvent('Menu Nav', 'Click', item)
    },
    feedClicked () {
      this.drawerOpen = false
      trackEvent('Footer Nav', 'Click', 'Feed')
    },
    actionCenterClicked () {
      this.drawerOpen = false
      trackEvent('Footer Nav', 'Click', 'Action Center')
    },
    myImpactClicked () {
      this.drawerOpen = !this.drawerOpen
      trackEvent('Footer Nav', 'Show', 'My Impact')
    },
    closeDrawer () {
      this.drawerOpen = false
      trackEvent('Footer Nav', 'Hide', 'My Impact')
    },
    showDetails (impact) {
      trackEvent('Drawer', 'Show', `Impact Details ${impact.type}`)
    },
    hideDetails (type) {
      trackEvent('Drawer', 'Hide', `Impact Details ${type}`)
    }
  },
  components: {
    Header,
    Footer,
    Drawer
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;

  .header {
    position: absolute;
    top: 0;
    left: 0;
  }

  .main-content {
    position: absolute;
    display: block;
    top: 60px;
    width: 100%;
    height: calc(100% - 120px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer {
    position: absolute;
    display: block;
    top: 60px;
    width: 100%;
    height: calc(100% - 120px);
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
