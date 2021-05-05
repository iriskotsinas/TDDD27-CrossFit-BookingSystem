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
    <div
      v-for="session in sessions"
      :key="session.id"
    >
      <Session
        :key="session.id"
        :session="session"
        :displaydate="true"
        @update-sessions="getUserSessions"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Session from '../components/Session';
export default {
  name: "Profile",
  components:{
    Session
  },
  data(){
    return {
      user: {},
      sessions: [],
    };
  },
  computed: {
    ...mapGetters(['getUserDetails', 'isLoggedIn', 'getAllSessions'])
  },
  created(){
    if(!this.isLoggedIn){
      this.$router.replace("/");
    }
    this.getUserSessions();
  },
  methods:{
    ...mapActions(['fetchAll']),
    getUserSessions: async function(){
        this.sessions = [];
        await this.fetchAll();
        this.user = this.getUserDetails;
        const allSessions = this.getAllSessions;
        const foundSessions = [];
        for(const id in this.user.sessions){
          const index = allSessions.findIndex(item => item._id === this.user.sessions[id]);
          if(index > -1)
            foundSessions.push(allSessions[index]);
        }
        this.sessions = foundSessions;
    }
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