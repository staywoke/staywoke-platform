import Vue from 'vue'
import Index from '@/components/Index'
import router from '@/router'

describe('Index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor({ router }).$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('UI Toolkit')
  })
})
