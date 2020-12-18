import store from '@/store'

export default function authenticated ({ next, router }) {
  if (store.getters['Auth/authenticated']) {
    return next({ name: 'products' })
  }

  return next()
}
