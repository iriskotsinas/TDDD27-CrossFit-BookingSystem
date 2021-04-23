<template>
  <div
    v-if="isLoggedIn"
    class="profile"
  >
    <h1>{{ user.firstname }}</h1>
    <h1>{{ user.lastname }}</h1>
    <h1>{{ user.email }}</h1>
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

</style>