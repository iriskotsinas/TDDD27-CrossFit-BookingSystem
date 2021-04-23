<template>
  <div
    class="header"
    @mouseleave="dropdown=false"
  >
    <div class="bar">
      <div class="logo"> 
        <router-link
          class="nav-btn"
          to="/"
        >
          LOGGA
        </router-link>
      </div>
      <div class="nav-container">
        <router-link
          class="nav-btn btn"
          to="/schedule"
        >
          Schedule
        </router-link>
        <router-link
          class="nav-btn btn"
          to="/login"
        >
          About us
        </router-link>
        <router-link
          class="nav-btn btn"
          to="/login"
        >
          Contact
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/profile"
          @mouseover="dropdown=true"
        >
          <img
            id="profile" 
            src="../assets/profile_logo.png"
            alt=""
            class="nav-btn"
          >
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          @mouseover="dropdown=true"
        >
          <img
            id="profile" 
            src="../assets/profile_logo.png"
            alt=""
            class="nav-btn"
          >
        </router-link>
      </div>
    </div>

    <div
      v-if="dropdown && !isLoggedIn" 
      class="dropdown-container"
    >
      <div class="dropdown-btn">
        <router-link
          class="btn"
          to="/login"
        >
          Login
        </router-link>
      </div>
      <div class="dropdown-btn">
        <router-link
          class="btn"
          to="/register"
        >
          Register
        </router-link>
      </div>
    </div>
    <div
      v-if="dropdown && isLoggedIn" 
      class="dropdown-container"
    >
      <div class="dropdown-btn">
        <router-link
          class="btn"
          to="/profile"
        >
          My profile
        </router-link>
      </div>
      <div class="dropdown-btn">
        <router-link
          class="btn"
          to="/"
          @click="onLogout"
        >
          Logout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      dropdown: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods:{
    ...mapActions(["logout"]),
    onLogout: function(){
      this.logout();
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  height: auto;
  width: 1.5em;
}
.dropdown-container{
  width: 20em;
  height: auto;
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
  // width: 100%;
  margin-right: 2em;
}
.dropdown-btn{
  margin: auto;
  width: 100%;
  height: 10%;
  background-color: $primary-color;
  padding: 1em;
  border-bottom: 4px solid black;
}
.btn{
  border: none;
  outline: none;
  color: white;
  text-decoration: none;
  text-align: center;
}
</style>