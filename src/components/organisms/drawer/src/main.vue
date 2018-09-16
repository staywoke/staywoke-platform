<template>
  <div class="drawer" v-show="drawerOpen">
    <transition name="fade" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div class="drawer-content" v-if="opened">
        <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
          <sw-my-impact v-if="!showDetail" @showDetails="showDetails" />
        </transition>
        <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
          <sw-my-impact-details :type="type" :total="total" :impact-details="impactDetails" v-if="showDetail" @hideDetails="hideDetails" />
        </transition>
      </div>
    </transition>

    <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="backdrop" v-if="opened" @click="closeDrawer"></div>
    </transition>
  </div>
</template>

<script>
import MyImpact from '@/components/organisms/my-impact'
import MyImpactDetails from '@/components/organisms/my-impact-details'

import { EventBus } from '../../../../event-bus'

export default {
  name: 'Drawer',
  props: {
    opened: {
      type: Boolean,
      default: true
    },
    showingDetails: {
      type: Boolean,
      default: false
    },
    impactList: {
      type: Array,
      default: () => ([])
    },
    impactDetails: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      drawerOpen: false,
      showDetail: false,
      type: null,
      total: 0
    }
  },
  mounted () {
    EventBus.$on('CLOSE_DRAWER', () => {
      this.closeDrawer()
    })
  },
  watch: {
    opened (opening) {
      this.drawerOpen = true

      if (!opening) {
        let self = this
        setTimeout(() => {
          self.drawerOpen = false
        }, 250)
      }
    }
  },
  methods: {
    closeDrawer () {
      this.showDetail = false
      this.$emit('closeDrawer')
      this.$emit('hideDetails', this.type)
    },
    showDetails (item) {
      this.type = item.type
      this.total = item.total
      this.showDetail = true
      this.$emit('showDetails', item)
    },
    hideDetails () {
      this.showDetail = false
      this.$emit('hideDetails', this.type)
    }
  },
  components: {
    MyImpact,
    MyImpactDetails
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  .drawer-content {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 85%;
    width: 100%;
    background: #FFFFFF;
    z-index: 6;
    overflow: auto;
    -webkit-overflow-scrolling: auto;
    padding: 20px 0;
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .drawer {
    height: calc(100% - 60px) !important;

    .drawer-content {
      max-width: 600px;
      left: calc(50% - 300px);
    }
  }
}
</style>
