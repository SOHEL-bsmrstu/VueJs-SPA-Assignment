import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import login from '../views/auth/login.vue'
import profile from '../views/auth/profile.vue'
import register from '../views/auth/register.vue'
import editProduct from '../views/products/edit.vue'
import productCreate from '../views/products/create.vue'
import productManage from '../views/products/manage.vue'
import pathNotFound from '../views/404.vue'

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
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/products',
    name: 'products',
    component: productManage,
    beforeEnter: (to, form, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({ path: 'login' })
      }
      next()
    }
  },
  {
    path: '/products/create',
    name: 'create-product',
    component: productCreate,
    beforeEnter: (to, form, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({ path: 'login' })
      }
      next()
    }
  },
  {
    path: '/products/:productId/edit',
    name: 'edit-product',
    component: editProduct,
    props: true,
    beforeEnter: (to, form, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({ path: 'login' })
      }
      next()
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: pathNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
