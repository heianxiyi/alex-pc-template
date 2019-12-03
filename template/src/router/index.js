import Vue from 'vue'
import VueRouter from 'vue-router'
import authUtils from '@/http/auth/utils'

Vue.use(VueRouter)

// 验证登录
function requireAuth(to, from, next) {
  if (!authUtils.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function requireLoginAuth(to, from, next){
  if (!authUtils.loggedIn()) {
    next()
  } else {
    next('/')
  }
}

const routes = [
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: requireLoginAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
