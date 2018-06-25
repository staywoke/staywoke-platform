import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Documentation from '@/components/Documentation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/docs',
      name: 'documentation',
      component: Documentation
    }
  ]
})
