<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <router-link class="nav-link" :to="{name:'home'}">
          <img src="./assets/logo.png" alt="logo" width="45" height="45">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'home'}" active-class="active" exact>Home</router-link>
            </li>
            <template v-if="authenticated">
              <li class="nav-item dropdown" style="cursor: pointer;">
                <a :class="{ 'active': isActive }" class="nav-link dropdown-toggle" id="navbarProductsMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">Products</a>
                <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarProductsMenuLink">
                  <router-link class="dropdown-item" :to="{ name:'create-product'}">Create</router-link>
                  <router-link class="dropdown-item" :to="{name: 'products'}">Manage</router-link>
                </div>
              </li>
              <li class="nav-item dropdown" style="cursor: pointer;">
                <a :class="{ 'active': isActiveUserProfile }" class="nav-link dropdown-toggle" id="navbarAuthMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">{{ user.name }}</a>
                <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarAuthMenuLink">
                  <router-link class="dropdown-item" :to="{name: 'profile'}">My Profile</router-link>
                  <a style="cursor: pointer;" type="button" class="dropdown-item" @click.prevent='logout()'>Logout</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name:'register'}" active-class="active">Register</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name:'login'}" active-class="active">Login</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'Auth/user',
      authenticated: 'Auth/authenticated'
    }),
    /**
     *
     * @return {boolean}
     */
    isActive: function () {
      return this.$route.name === 'create-product' || this.$route.name === 'products'
    },
    /**
     *
     * @return {boolean}
     */
    isActiveUserProfile: function () {
      return this.$route.name === 'profile'
    }
  },
  methods: {
    ...mapActions({
      logoutAction: 'Auth/logout'
    }),
    logout: function () {
      this.logoutAction(this.$router.currentRoute.path)
    }
  }
}
</script>
