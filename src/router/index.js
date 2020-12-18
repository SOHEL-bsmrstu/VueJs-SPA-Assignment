import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import login from '../views/auth/login.vue'
import profile from '../views/auth/profile.vue'
import register from '../views/auth/register.vue'
import editProduct from '../views/products/edit.vue'
import productCreate from '../views/products/create.vue'
import productManage from '../views/products/manage.vue'
import pathNotFound from '../views/404.vue'
import auth from '../middleware/auth'
import authenticated from '../middleware/authenticated'
import pipeline from '../middleware/pipeline'

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
    component: register,
    meta: {
      middleware: [authenticated]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      middleware: [authenticated]
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/products',
    name: 'products',
    component: productManage,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/products/create',
    name: 'create-product',
    component: productCreate,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/products/:productId/edit',
    name: 'edit-product',
    component: editProduct,
    props: true,
    meta: {
      middleware: [auth]
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

/**
 * Handle route middlewares
 */
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const context = { to, from, next, router }
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
    return middleware[0]({ ...context, next: pipeline(context, middleware) })
  }

  return next()
})

export default router
