import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
  if (mutation.type === 'Auth/SET_TOKEN') {
    if (mutation.payload) {
      localStorage.setItem('token', mutation.payload)
      axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
    } else {
      localStorage.removeItem('token')
      axios.defaults.headers.common['Authorization'] = null
    }
  }
})
