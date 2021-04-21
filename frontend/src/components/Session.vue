<template>
  <div :class="{'signed': signedUp, 'unsigned':!signedUp}">
    <h1>{{ session.activity }}</h1>
    <p>{{ session.date }}</p>
    <button
      v-if="isLoggedIn"
      @click="onSignup(session._id)"
    >
      Sign up
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  name: "Session",
  props: {
    session: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      signedUp: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserDetails'])
  },
  methods:{
    onSignup: async function(id){
      console.log(this.getUserDetails);
      const response = await axios.post('http://localhost:5000/api/adduser', {
        userId: this.getUserDetails._id, 
        id});
      console.log(this.signedUp);
      this.signedUp = response.data.status ? true : false;
      console.log(this.signedUp);
    }
  },

};
</script>

<style lang="scss" scoped>
.signed{
  height: 10em;
  width: 100%;
  // margin: auto;
  background-color: green;
}
.unsigned{
  height: 10em;
  width: 100%;
  // margin: auto;
  background-color: red;
}
</style>