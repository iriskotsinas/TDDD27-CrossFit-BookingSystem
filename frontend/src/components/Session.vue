<template>
  <div :class="{'signed': signedUp, 'unsigned':!signedUp}">
    <h1>{{ session.activity }}</h1>
    <p>{{ session.date }}</p>
    <button
      v-if="isLoggedIn && !signedUp"
      @click="onSignup(session._id)"
    >
      Sign up
    </button>
    <button
      v-if="isLoggedIn && signedUp"
      @click="onCancel(session._id)"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
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
  created(){
    const sessions = this.getUserDetails.sessions;
    for(const s in sessions)
      if(sessions[s] === this.session._id)
        this.signedUp = true;
  },
  methods:{
    ...mapActions(['saveUser']),
    onSignup: async function(id){
      try{
        const response = await axios.post('http://localhost:5000/api/signup', {
          userId: this.getUserDetails._id, 
          id});
        if(response.data.error) console.log(response.data.error);
        else{
          this.signedUp = true;
          await this.saveUser(response.data.user);
        }
      }catch(err){
        console.log(err);
      }
    },
    onCancel: async function(id){
      try{
        const response = await axios.delete('http://localhost:5000/api/signup', {
          data: {
          userId: this.getUserDetails._id, 
          id}});
        if(response.data.error) console.log(response.data.error);
        else{
          this.signedUp = false;
          await this.saveUser(response.data.user);
        }
      }catch(err){
        console.log(err);
      }
    }
  }
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