<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Vue.js SPA Demo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/home.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
