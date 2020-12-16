<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/logo.png" alt="logo" width="45" height="45">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <template v-if="authenticated">
              <li class="nav-item dropdown" style="cursor: pointer;">
                <a class="nav-link dropdown-toggle" id="navbarProductsMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">Products</a>
                <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarProductsMenuLink">
                  <router-link class="dropdown-item" to="products/create">Create</router-link>
                  <router-link class="dropdown-item" to="products">Manage</router-link>
                </div>
              </li>
              <li class="nav-item dropdown" style="cursor: pointer;">
                <a class="nav-link dropdown-toggle" id="navbarAuthMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">{{ user.name }}</a>
                <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarAuthMenuLink">
                  <router-link class="dropdown-item" to="products/create">Profile</router-link>
                  <a style="cursor: pointer;" type="button" class="dropdown-item" @click.prevent='logout()'>Logout</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
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
    })
  },
  methods: {
    ...mapActions({
      logoutAction: 'Auth/logout'
    }),
    logout: function () {
      this.logoutAction()
    }
  }
}
</script>
