<template>
  <div class="my-impact">
    <ul>
      <li v-for="(impact, index) in impactList" :key="index" v-if="impact.total > 0">
        <sw-impact :impact="impact" @moreClicked="moreClicked(impact)" />
      </li>
    </ul>
  </div>
</template>

<script>
import Impact from '@/components/molecules/impact'

export default {
  name: 'MyImpact',
  props: {
    impactList: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    moreClicked (impact) {
      this.$emit('showDetails', impact)
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
}
</style>
