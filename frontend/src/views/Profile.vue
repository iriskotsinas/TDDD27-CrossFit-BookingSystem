<template>
  <div
    v-if="isLoggedIn"
    class="profile"
  >
    <h1>User profile</h1>
    <div class="profile-info">
      <h2>Name: {{ user.firstname }} {{ user.lastname }}</h2>
      <h2>Email: {{ user.email }}</h2>
      <h2>Role: {{ user.role }}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Profile",
  data(){
    return {
      user: this.getUserDetails
    };
  },
  computed: {
    ...mapGetters(['getUserDetails', 'isLoggedIn'])
  },
  created(){
    if(!this.isLoggedIn){
      this.$router.replace("/");
    }

    this.user = this.getUserDetails;
    console.log(this.getUserDetails);
  }
};
</script>

<style lang="scss" scoped>

.profile {
  margin: 10em 10em;
}

.profile-info {
  margin: 5em 0;
  display: block;
  text-align: left;
}

</style>