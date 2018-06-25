import Vue from 'vue'
import Documentation from '@/components/Documentation'
import router from '@/router'

describe('Documentation.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Documentation)
    const vm = new Constructor({ router }).$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('UI Toolkit')
  })
})
