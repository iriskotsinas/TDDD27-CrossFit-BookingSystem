<template>
  <div
    :class="{'session': !displaydate, 'session-date':displaydate}"
  >
    <div class="center">
      {{ session.date.substring(11,16) + " - " + endTime.substring(11,16) }}
    </div>
    <div
      v-if="displaydate"
      class="center"
    >
      {{ session.date.substring(0,10) }}
    </div>
    <div class="center">
      {{ session.activity }}
    </div>
    <div class="center">
      {{ session.users.length + '/' + session.maxSlots }}
    </div>
    <div
      class="signup center"
    >  
      <button
        v-if="isLoggedIn && !signedUp"
        class="signup-btn"
        :class="{'signed': signedUp, 'unsigned':!signedUp, 'btn-disabled': isFull && !signedUp}"
        @click="onSignup(session._id)"
      >
        Sign up
      </button>
      <button
        v-if="isLoggedIn && signedUp"
        class="signup-btn"
        :class="{'signed': signedUp, 'unsigned':!signedUp}"
        @click="showCancelAlert=true"
      >
        Cancel
      </button>
    </div>
    <div class="details">
      <div>{{ session.description }}</div>
    </div>
    <div class="details">
      <div>Instructor: {{ session.instructor }}</div>
      <div>Session length: {{ session.length }}min</div>
    </div>
    <div class="details details-bottom">
      <button
        v-if="isLoggedIn && isAdmin"
        class="details-btn"
        @click="onShowUsers(session._id)"
      >
        Show Users
      </button>
    </div>
    <div class="details details-bottom">
      <button
        v-if="isLoggedIn && isAdmin"
        class="delete-btn"
        @click="showDeleteAlert=true"
      >
        Delete
      </button>
    </div>
    <Modal
      v-if="showUsers"
      :users="users"
      @show="showUsers=false"
    />
    <Alert
      v-if="showCancelAlert"
      :action="'cancel'"
      @show="showCancelAlert=false"
      @cancel="showCancelAlert=false; onCancel(session._id)"
    />
    <Alert
      v-if="showDeleteAlert"
      :action="'delete'"
      @show="showDeleteAlert=false"
      @delete=" showDeleteAlert=false; onDelete(session._id)"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

export default {
  name: "Session",
  components: {
    Modal, Alert
  },
  props: {
    session: {
      type: Object,
      default: null
    },
    displaydate: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-sessions', 'fetch'],
  data() {
    return {
      signedUp: false,
      isFull: false,
      users: {},
      showUsers: false,
      showCancelAlert: false,
      showDeleteAlert: false,
      endTime: ''
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserDetails', 'isAdmin'])
  },
  async created(){
    await this.checkFull();
    await this.checkSigned();
  },
  updated(){
 this.checkFull();
  },
  mounted(){
    const date = new Date(this.session.date);
    this.endTime = new Date(date.getTime() + this.session.length*60000).toISOString();
  },
  methods:{
    ...mapActions(['saveUser', 'saveSession']),
    onSignup: async function(id){
      try{
        const response = await axios.post('http://localhost:5000/api/signup', {
          userId: this.getUserDetails._id, 
          id
        }, {
          headers: { 'auth-token': localStorage.getItem('jwt')},
        });
        if(response.data.error) console.log(response.data.error);
        if(response.data.full){
          this.$emit('fetch');
        }
        else{
          
          await this.saveSession(response.data.session);
          await this.saveUser(response.data.user);
          this.signedUp = true;
          this.$emit('update-sessions');
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
          await this.saveSession(response.data.session);
          await this.saveUser(response.data.user);
          this.$emit('update-sessions');
          await this.checkFull();
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
    onDelete: async function(id){
      try{
        const response = await axios.delete('http://localhost:5000/api/booking', {
          headers: { 'auth-token': localStorage.getItem('jwt')},
          data: {
            id, userId: this.getUserDetails._id
          }});
        if(response.data.error) console.log(response.data.error);
        else{
          await this.saveUser(response.data.user);
           this.$emit('fetch'); 
           this.$emit('update-sessions');
        }
      }catch(err){
        console.log(err);
      }
    },
    checkFull: function(){
      this.isFull = (this.session.users.length >= this.session.maxSlots) ? true : false;
    },
    checkSigned: async function(){
      const sessions = this.getUserDetails.sessions;
      let res = false;
      for(const s in sessions)
      {
        if(sessions[s] === this.session._id){
          res = true;
        }
      }
      this.signedUp = res;
    }
  }
};
</script>

<style lang="scss" scoped>

button {
  border: none;
  outline: none;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  font-family: $font-header;
  font-weight: bold;
  height: 2em;
  width: 8em;
  
  &:hover{
    opacity: 0.6;
  }
}

.details-btn {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
}

.delete-btn {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 0, 0);
}

.details {
  display: none;
  font-size: 0.8rem;
  padding: 1em 0;
  font-family: $font-text;
  font-weight: 300;
}

.details-bottom {
  align-self: end;
}

.signup-btn {
  height: 2em;
  width: 8em;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.session {
  background-color: rgb(12, 12, 12);
  color: white;
  margin-bottom: 0.2em;
  padding: 1em 3em;
  height: auto;
  font-size: 1.3rem;
  font-weight: bold;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 15vw 10vw 7vw;
  text-align: justify;
  justify-content: center;
}
.session-date {
  background-color: rgb(12, 12, 12);
  color: white;
  margin-bottom: 0.2em;
  padding: 1em 3em;
  height: auto;
  font-size: 1.3rem;
  font-weight: bold;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr 1fr 1fr 7vw;
  text-align: justify;
  justify-content: center;
}

.center {
  margin: auto 0;
}

.session:hover .details {
  height: auto;
  display: block;
}
.session-date:hover .details {
  height: auto;
  display: block;
}
.signed {
  background: $secondary-color;
}

.unsigned {
  background: rgb(255, 255, 255);
}
.btn-disabled{
  background: rgb(41, 41, 41);
  pointer-events: none;
}
</style>