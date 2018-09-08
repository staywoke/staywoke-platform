<template>
  <div class="page">
    <sw-header
      :email-hash="emailHash"
      :username="firstName"
      :action-count="actionCount"
      @accountClicked="accountClicked"
      @logoClicked="logoClicked"
      @menuClicked="menuClicked"
      @menuItemClicked="menuItemClicked"
      @myImpactClicked="myImpactClicked"
    />

    <div class="main-content" v-scroll="onScroll">
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
import { EventBus } from '../../../../event-bus'
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
      drawerOpen: false,
      emailHash: this.$store.getters.getUserEmailHash,
      firstName: this.$store.getters.getFirstName,
      actionCount: 0 // @TODO: Fetch this from AWS
    }
  },
  created () {
    let self = this

    EventBus.$on('USER_LOGIN', () => {
      self.emailHash = this.$store.getters.getUserEmailHash
      self.firstName = this.$store.getters.getFirstName
    })
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
    },
    onScroll (evt, position) {
      const nearOffset = 60
      const clientHeight = evt.target.clientHeight
      const scrollHeight = evt.target.scrollHeight
      const scrollTop = position.scrollTop

      const atBottom = (clientHeight + scrollTop === scrollHeight)
      const atTop = (scrollTop === 0)
      const nearBottom = (clientHeight + scrollTop > scrollHeight - nearOffset)
      const nearTop = (scrollTop <= nearOffset)
      const percentScrolled = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)

      EventBus.$emit('SCROLLED', {
        atBottom: atBottom,
        atTop: atTop,
        nearBottom: nearBottom,
        nearTop: nearTop,
        percentScrolled: percentScrolled
      })
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
@media (min-width: 1024px) {
  .main-content {
    height: calc(100% - 60px) !important;
  }
  .footer {
    display: none;
  }
}
</style>
