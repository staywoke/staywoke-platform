import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NewsArticle from '@/components/NewsArticle'
import ActionItem from '@/components/ActionItem'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Register from '@/components/Register'
import ForgotPassword from '@/components/ForgotPassword'
import Actions from '@/components/Actions'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      component: Register
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      beforeEnter: (to, from, next) => {
        const answer = window.confirm('Are you sure you want to logout?')

        if (answer) {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
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
