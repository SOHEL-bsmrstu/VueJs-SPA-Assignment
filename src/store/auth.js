import '../helpers/functions'
import mixin from '../helpers/request'
import * as axios from 'axios'
import router from '../router'

export default ({
  namespaced: true,
  state: {
    user: null,
    token: null
  },
  getters: {
    /**
     *
     * @param state
     * @return {null|PublicKeyCredentialUserEntity}
     */
    authenticated: function (state) {
      return state.token && state.user
    },
    /**
     *
     * @param state
     * @return {(function(*): *)|null|PublicKeyCredentialUserEntity}
     */
    user: function (state) {
      return state.user
    }
  },
  mutations: {
    /**
     *
     * @param state
     * @param token
     * @constructor
     */
    SET_TOKEN: function (state, token) {
      state.token = token
    },
    /**
     *
     * @param state
     * @param user
     * @constructor
     */
    SET_USER: function (state, user) {
      state.user = user
    }
  },
  actions: {
    /**
     * @return void
     */
    login: function ({ dispatch }, credentials) {
      mixin.methods.request('post', 'login', credentials, (response) => {
        if (response.success) {
          router.replace('/')
          dispatch('authenticate', response.access_token)
          mixin.methods.notify().success('Yay! You are successfully login')
        } else {
          mixin.methods.notify().error('Oops! Something went wrong')
        }
      })
    },
    /**
     * @return void
     */
    logout: function ({ commit }) {
      mixin.methods.request('post', 'logout', null, (response) => {
        if (response.success) {
          router.replace('/')
          commit('SET_TOKEN', null)
          commit('SET_USER', null)
          mixin.methods.notify().success('Yay! You are successfully logout')
        } else {
          mixin.methods.notify().error('Oops! Something went wrong')
        }
      })
    },
    /**
     *
     * @param commit
     * @param state
     * @param token
     */
    authenticate: async function ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }
      if (!state.token) return

      try {
        let response = await axios.post('auth')
        commit('SET_USER', response.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    }
  }
})
