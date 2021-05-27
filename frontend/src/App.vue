<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'App',
  components: {
    Header, Footer
  }
};
</script>

<style lang="scss">

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: auto;
  color: $text-color-standard;
  font-family: $font-text;
}

html {
  background-color: $background-color;
}

body{
  margin: 0;
  padding: 0;
  cursor: default;
}
</style>
