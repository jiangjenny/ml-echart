import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '../page/login.vue'
import Trade from '../page/trade.vue'
import Final from '../page/final.vue'
import Merchart from '../page/merchart.vue'
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
    },
    {
      path: '/final',
      name:'final',
      component: Final
    },
    {
      path: '/merchart',
      name: 'merchart',
      component: Merchart
    }
  ]
})

export default router

