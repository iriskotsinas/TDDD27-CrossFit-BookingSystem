<template>
  <div class="header">
    <div class="logo">
      <router-link class="nav-btn" to="/">LOGGA</router-link>
    </div>
    <div class="nav-container">
      <router-link class="nav-btn" to="/">Home</router-link>
      <router-link class="nav-btn" to="/login">Login</router-link>
      <router-link class="nav-btn" to="/login">Hej</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 4wh;
  background-color: $primary-color;
  display: inline-flex;
  justify-content: space-evenly;
}

.nav-btn {
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  display: inline-block;
  outline: none;
  color: white;
  margin: auto;
  width: 6vw;
  text-decoration: none;
  text-align: center;
}
</style>