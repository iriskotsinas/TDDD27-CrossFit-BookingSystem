<template>
  <div
    class="session"
  >
    <div class="time">
      {{ session.date.substring(11,16) + " - " + endTime.substring(11,16) }}
    </div>
    <div class="activity">
      {{ session.activity }}
    </div>
    <div class="slots">
      {{ session.users.length + '/' + session.maxSlots }}
    </div>
    <div
      class="signup"
    >  
      <button
        v-if="isLoggedIn && !signedUp"
        class="signup-btn"
        :class="{'signed': signedUp, 'unsigned':!signedUp}"
        @click="onSignup(session._id)"
      >
        SIGN UP
      </button>
      <button
        v-if="isLoggedIn && signedUp"
        class="signup-btn"
        :class="{'signed': signedUp, 'unsigned':!signedUp}"
        @click="onCancel(session._id)"
      >
        Cancel
      </button>
    </div>
    <div class="details-container">
      Details:
      <div>{{ session.description }}</div>
    </div>
    <div class="details-container">
      <div>Instructor: {{ session.instructor }}</div>
      <div>Session length: {{ session.length }}min</div>
    </div>
    <div class="details-container">
      <button
        v-if="isLoggedIn && isAdmin"
        class="details-btn"
        @click="onShowUsers(session._id)"
      >
        Registered members
      </button>
    </div>
    <div class="details-container">
      <button
        v-if="isLoggedIn && isAdmin"
        class="delete-btn"
        @click="onDeleteSession(session._id)"
      >
        Delete session
      </button>
    </div>
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
      showUsers: false,
      endTime: ''
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
  mounted(){
    const date = new Date(this.session.date);
    this.endTime = new Date(date.getTime() + this.session.length*60000).toISOString();
    console.log(this.session.users.length);
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
button{
  border: none;
  outline: none;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}
.details-btn{
  height: 3em;
  width: 6em;
  color: rgb(255, 255, 255);
  background-color: blue;
  font-weight: bold;
}
.delete-btn{
  height: 3em;
  width: 6em;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 0, 0);
  font-weight: bold;
}
.details-container{
  display: none;
  font-size: 0.8rem;
  padding-top: 1em;
}
.signup-btn{
  height: 3em;
  width: 6em;
  color: white;
  font-weight: bold;
}
.session{
  height: auto;
  color: $text-color-black;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1em 3em;
  margin-bottom: 0.2em;
  display: grid;
  gap:1em;
  grid-template-columns: 1fr 15vw 10vw 5vw;
  text-align: left;
  justify-content: center;
  
  background-color: white;
}
.session:hover .details-container{
  height: auto;
  display: block;
}
.signed{
  background: $secondary-color;
}
.unsigned{
  background: rgb(63, 158, 0);
}
</style>