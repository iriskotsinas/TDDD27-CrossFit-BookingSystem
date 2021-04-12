<template>
  <div class="header" @mouseleave="dropdown=false">
    <div class="bar" >
      <div class="logo">
        <router-link class="nav-btn" to="/">LOGGA</router-link>
      </div>
      <div class="nav-container">
        <router-link class="nav-btn" to="/login">Schedule</router-link>
        <router-link class="nav-btn" to="/login">About us</router-link>
        <router-link class="nav-btn" to="/login">Contact</router-link>
        <a class="nav-btn" id="profile" @mouseover="dropdown=true" >Login</a>
      </div>
      </div>

    <div v-if="dropdown" class="dropdown-container" >
      <ul>
          
          <li><a href="#">Sub Menu Item</a></li>
          <li><a href="#">Sub Menu Item</a></li>
          <li><a href="#">Sub Menu Item</a></li>

        </ul>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    dropdown: true
  }
}
}
</script>

<style lang="scss" scoped>
#profile{
  cursor: default;
}
.dropdown-container{
  width: 40vw;
  height: 20vh;
  position: absolute;
  background: pink;
  right: 0;
  top:4vh;
  z-index: 1;

}
.bar {
  font-family: $font-header;
  width: 100%;
  height: 4vh;
  background-color: $primary-color;
  display: inline-flex;
  justify-content: space-between;
}
.nav-container{
  justify-content: space-evenly;
  margin: auto 0;
}
.nav-btn {
  font-size: 1.1rem;
  border: none;
  // cursor: pointer;
  outline: none;
  color: white;
  width: 100%;
  text-decoration: none;
  text-align: center;
  margin-right: 2em;
}
</style>