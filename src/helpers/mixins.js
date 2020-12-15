import Vue from 'vue'

import Request from './request'
import Functions from './functions'

Vue.mixin({
  mixins: [Request, Functions]
})
