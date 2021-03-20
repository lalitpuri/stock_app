<template>
  <div id="app" class="home">
    <img alt="Stock logo" src="./assets/stock_logo.png">
    <mainPage msg="Welcome to App"/>
  </div>
</template>

<script>
import mainPage from './components/mainPage.vue'

export default {
  name: 'home',
  components: {
    mainPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
