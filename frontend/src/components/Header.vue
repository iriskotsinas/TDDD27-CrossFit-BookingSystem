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
          <img 
            src="https://static.wixstatic.com/media/9c3023_6523bc46c4cd43a895813995faf96c32~mv2.png/v1/fill/w_350,h_112,al_c,q_85,usm_0.66_1.00_0.01/hitness_UTAN_svart_bg_ingen%20slogan2x.webp" 
            alt="hitness_UTAN_svart_bg_ingen slogan2x.png" 
            class="logo"
          >
        </router-link>
      </div>
      <div class="nav-container">
        <router-link
          class="nav-btn btn"
          to="/schedule"
        >
          Schedule
        </router-link>
        <a
          class="nav-btn btn"
          href="/#about"
        >
          About
        </a>
        <a
          class="nav-btn btn"
          href="/#contact"
        >
          Contact
        </a>
        <router-link
          v-if="isLoggedIn"
          to="/profile"
          @mouseover="dropdown=true"
        >
          <img
            id="profile" 
            src="../assets/profile2.jpeg"
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
      <router-link
        class="btn"
        to="/login"
      >
        <div class="dropdown-btn">
          Login
        </div>
      </router-link>
      <router-link
        class="btn"
        to="/register"
      >
        <div class="dropdown-btn">
          Register
        </div>
      </router-link>
    </div>
    <div
      v-if="dropdown && isLoggedIn" 
      class="dropdown-container"
    >
      <router-link
        class="btn"
        to="/profile"
      >
        <div class="dropdown-btn">
          My profile
        </div>
      </router-link>
      <router-link
        v-if="isAdmin"
        class="btn"
        to="/admin"
      >
        <div
          class="dropdown-btn"
        >
          Admin
        </div>
      </router-link>
      <router-link
        class="btn"
        to="/"
        @click="onLogout"
      >
        <div class="dropdown-btn">
          Logout
        </div>
      </router-link>
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
    ...mapGetters(['isLoggedIn', 'isAdmin'])
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

.header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: $primary-color;
}

img {
  height: auto;
  width: 1.8em;
}

.logo {
  margin: 0 0 0 1em;
  width: 175px;
  height: 56px;
  object-fit: cover;
  object-position: 50% 50%;
}

.dropdown-container {
  width: 20em;
  height: auto;
  position: absolute;
  right: 0;
  z-index: 1;
}

.bar {
  font-family: $font-header;
  width: 100%;
  height: 4vh;
  display: inline-flex;
  justify-content: space-between;
  padding: 2em 0 2em 0;
}

.nav-container {
  justify-content: space-evenly;
  margin: auto 0;
}

.nav-btn {
  font-size: 1.1rem;
  margin-right: 4em;
}

.dropdown-btn {
  margin: auto;
  height: 10%;
  background-color: $primary-color;
  padding: 1em;
  &:hover {
    background-color: $grey-color;
  }
}

.btn {
  border: none;
  outline: none;
  color: white;
  text-decoration: none;
  text-align: center;

  &:hover {
    opacity: 0.6;
    transition: 0.3s;
  }
}
</style>