import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './helpers/mixins'
import '@/store/subscribe'

import 'jquery/src/jquery.js'
import './assets/css/style.css'
import 'toastr/build/toastr.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
store.dispatch('Auth/authenticate', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
