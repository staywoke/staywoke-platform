import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ActionCenter from '@/components/ActionCenter'
import NewsArticle from '@/components/NewsArticle'
import ActionItem from '@/components/ActionItem'
import Login from '@/components/Login'
import Actions from '@/components/Actions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: null
    },
    {
      path: '/logout',
      name: 'logout',
      component: null
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: null
    },
    {
      path: '/action-center',
      name: 'action-center',
      component: ActionCenter
    },
    {
      path: '/news/:slug',
      name: 'news',
      component: NewsArticle
    },
    {
      path: '/actions/:slug',
      name: 'actions',
      component: Actions
    },
    {
      path: '/action/:type/:slug',
      name: 'action',
      component: ActionItem
    }
  ]
})
