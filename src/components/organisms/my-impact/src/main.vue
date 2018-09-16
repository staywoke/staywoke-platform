<template>
  <div class="my-impact">
    <ul v-if="loggedIn && impactList">
      <li v-for="(impact, index) in impactList" :key="index" v-if="impact.total > 0">
        <sw-impact :impact="impact" @moreClicked="moreClicked(impact)" />
      </li>
    </ul>

    <div class="login-required" v-if="!loggedIn">
      Login to view Your Impact

      <router-link :to="{ name: 'login' }">
        <el-button @click="hideMyImpact">
          <span class="button-label">Login</span>
        </el-button>
      </router-link>
    </div>

    <div class="no-impact" v-if="loggedIn && impactList.length === 0">
      <p class="header">Nothing to see here</p>
      <p>Check our Latest Actions to get involved. Your efforts will be shown here.</p>

      <router-link :to="{ name: 'index' }">
        <el-button @click="hideMyImpact">
          <span class="button-label">Latest Actions</span>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Impact from '@/components/molecules/impact'
import { EventBus } from '../../../../event-bus'

export default {
  name: 'MyImpact',
  data () {
    return {
      loggedIn: this.$store.getters.isLoggedIn,
      impactList: this.$store.getters.getImpact
    }
  },
  methods: {
    moreClicked (impact) {
      this.$emit('showDetails', impact)
    },
    hideMyImpact () {
      EventBus.$emit('CLOSE_DRAWER')
    }
  },
  components: {
    Impact
  }
}
</script>

<style lang="scss" scoped>
.my-impact {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      border-bottom: 1px solid #DDD;
      padding: 0 25px 10px 25px;

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }

  .login-required {
    text-align: center;
    padding: 10px;
    text-transform: uppercase;
    margin-top: calc(40% - 20px);

    button {
      clear: both;
      display: block;
      width: 50%;
      background: #000;
      color: #fff;
      text-transform: uppercase;
      margin: 0 auto;
      margin-top: 20px;
    }
  }

  .no-impact {
    text-align: center;
    padding: 10px;
    text-transform: uppercase;
    margin-top: calc(40% - 50px);

    .header {
      font-weight: 600;
      font-size: 20px;
    }

    button {
      width: 50%;
      background: #000;
      color: #fff;
      text-transform: uppercase;
      margin-top: 20px;
    }
  }
}
</style>
