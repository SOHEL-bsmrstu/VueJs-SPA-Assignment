import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import login from '../views/auth/login.vue'
import register from '../views/auth/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/products',
    name: 'products',
    component: home,
    beforeEnter: (to, form, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({ path: 'login' })
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
