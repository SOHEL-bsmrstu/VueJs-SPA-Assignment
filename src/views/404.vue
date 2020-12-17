<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="404, Requested path is not exist"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/home.vue'

export default {
  name: '404',
  components: {
    HelloWorld
  }
}
</script>
