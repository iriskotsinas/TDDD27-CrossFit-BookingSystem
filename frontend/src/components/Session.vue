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
    <button
      v-if="isLoggedIn && isAdmin"
      @click="onShowUsers(session._id)"
    >
      Registered members
    </button>
    <button
      v-if="isLoggedIn && isAdmin"
      @click="onDeleteSession(session._id)"
    >
      Delete session
    </button>
    <Modal
      v-if="showUsers"
      :users="users"
      @show="showUsers=false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Modal from '../components/Modal';

export default {
  name: "Session",
  components: {
    Modal
  },
  props: {
    session: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      signedUp: false,
      users: {},
      showUsers: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserDetails', 'isAdmin'])
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
          id
        }, {
          headers: { 'auth-token': localStorage.getItem('jwt')},
        });
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
          headers: { 'auth-token': localStorage.getItem('jwt')},
          data: {
          userId: this.getUserDetails._id, 
          id
        }});
        if(response.data.error) console.log(response.data.error);
        else{
          this.signedUp = false;
          await this.saveUser(response.data.user);
        }
      }catch(err){
        console.log(err);
      }
    },
    onShowUsers: async function(id){
      try{
        this.showUsers = true;
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { 'auth-token': localStorage.getItem('jwt')},
          params: {
            id
          }
        });
        if (response.data.error) console.log(response.data.error);
        else {
          this.users = response.data.users;
          console.log(this.users[0].firstname);
        }
      } catch (err) {
        console.log(err);
      }
    },
    onDeleteSession: async function(id){
      try{
        const response = await axios.delete('http://localhost:5000/api/booking', {
          headers: { 'auth-token': localStorage.getItem('jwt')},
          data: {
            id
          }});
        if(response.data.error) console.log(response.data.error);
        else{
          
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