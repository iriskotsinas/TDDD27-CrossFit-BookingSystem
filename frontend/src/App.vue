<template>
<div id="app">
  <Header />
  <router-view />
</div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: auto;
  color: $text-color-standard;
  background-color: $background-color;
}
body{
  margin: 0;
  padding: 0;
  cursor: default;
}
</style>
