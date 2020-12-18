import store from '@/store'

export default function auth ({ next, router }) {
  if (!store.getters['Auth/authenticated']) {
    return next({ path: 'login' })
  }

  return next()
}
