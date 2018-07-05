<template>
  <transition name="fade">
    <div class="drawer" v-if="opened">
      <div class="drawer-content">
        <sw-my-impact :impact-list="impactList" v-if="impactList.length > 0 && !showDetail" @showDetails="showDetails" />
        <sw-my-impact-details :type="type" :total="total" :impact-details="impactDetails" v-if="showDetail" @hideDetails="hideDetails" />
      </div>
      <div class="backdrop" @click="closeDrawer"></div>
    </div>
  </transition>
</template>

<script>
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
  methods: {
    closeDrawer() {
      this.showDetail = false
      this.$emit('closeDrawer')
      this.$emit('hideDetails', this.type)
    },
    showDetails(item) {
      this.type = item.type
      this.total = item.total
      this.showDetail = true
      this.$emit('showDetails', item)
    },
    hideDetails() {
      this.showDetail = false
      this.$emit('hideDetails', this.type)
    }
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
</style>
