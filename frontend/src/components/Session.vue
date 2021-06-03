<template>
  <div
    class="collapsible"
    @click="isExpaned=!isExpaned"
  >
    <div class="content">
      <section
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
            class="sign-btn"
            :class="{'signed': signedUp, 'unsigned':!signedUp, 'btn-disabled': isFull && !signedUp}"
            @click.stop="onSignup(session._id)"
          >
            Sign up
          </button>
          <button
            v-if="isLoggedIn && signedUp"
            class="cancel-btn"
            :class="{'signed': signedUp, 'unsigned':!signedUp}"
            @click.stop="showCancelAlert=true"
          >
            Cancel
          </button>
        </div>
      </section>
      <section
        v-if="isExpaned"
        :id="session._id"
        class="details"
      > 
        <div class="description">
          {{ session.description }}
        </div>
        <div class="info">
          <div>Instructor: {{ session.instructor }}</div>
          <div>Session length: {{ session.length }}min</div>
        </div>
        <div class="details-bottom">
          <button
            v-if="isLoggedIn && isAdmin"
            class="details-btn"
            @click.stop="onShowUsers(session._id)"
          >
            Show Users
          </button>
          <button
            v-if="isLoggedIn && isAdmin"
            class="delete-btn"
            @click.stop="showDeleteAlert=true"
          >
            Delete
          </button>
        </div>
      </section>
    </div>
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
      users: {},
      endTime: '',
      signedUp: false,
      isFull: false,
      showUsers: false,
      showCancelAlert: false,
      showDeleteAlert: false,
      isExpaned: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserDetails', 'isAdmin'])
  },
  async created() {
    await this.checkFull();
    await this.checkSigned();
  },
  updated() {
    this.checkFull();
  },
  mounted() {
    const date = new Date(this.session.date);
    this.endTime = new Date(date.getTime() + this.session.length*60000).toISOString();
  },
  methods:{
    ...mapActions(['saveUser', 'saveSession']),
    // onExpand: function() {
    //   const details = document.getElementById(this.session._id);
    //   details.style.display = details.style.display === "grid" ? "none" : "grid";
    // },
    onSignup: async function(id) {
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          userId: this.getUserDetails._id, 
          id
        }, {
          headers: { 'auth-token': localStorage.getItem('jwt')},
        });
        if (response.data.error) console.log(response.data.error);
        if (response.data.full){
          this.$emit('fetch');
        } else {
          await this.saveSession(response.data.session);
          await this.saveUser(response.data.user);
          this.signedUp = true;
          this.$emit('update-sessions');
        }
      } catch (err) {
        console.log(err);
      }
    },
    onCancel: async function(id) {
      try {
        const response = await axios.delete('http://localhost:5000/signup', {
          headers: { 'auth-token': localStorage.getItem('jwt')},
          data: {
          userId: this.getUserDetails._id, 
          id
        }});
        if (response.data.error) console.log(response.data.error);
        else {
          await this.saveSession(response.data.session);
          await this.saveUser(response.data.user);
          this.signedUp = false;
          this.$emit('update-sessions');
          this.checkFull();
        }
      } catch (err) {
        console.log(err);
      }
    },
    onShowUsers: async function(id) {
      try {
        this.showUsers = true;
        const response = await axios.get('http://localhost:5000/users', {
          headers: { 'auth-token': localStorage.getItem('jwt')},
          params: {
            id
          }
        });
        if (response.data.error) console.log(response.data.error);
        else {
          this.users = response.data.users;
        }
      } catch (err) {
        console.log(err);
      }
    },
    onDelete: async function(id) {
      try {
        const response = await axios.delete('http://localhost:5000/session', {
          headers: { 'auth-token': localStorage.getItem('jwt')},
          data: {
            id, userId: this.getUserDetails._id
          }});
        if (response.data.error) console.log(response.data.error);
        else {
          await this.saveUser(response.data.user);
          this.$emit('fetch'); 
          this.$emit('update-sessions');
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkFull: function() {
      this.isFull = (this.session.users.length >= this.session.maxSlots) ? true : false;
    },
    checkSigned: async function() {
      const sessions = this.getUserDetails.sessions;
      let res = false;
      for (const s in sessions) {
        if (sessions[s] === this.session._id) {
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
  box-sizing: border-box;
  appearance: none;
  background-color: black !important;
  border: 2px solid #fff;
  border-radius: 0.6em;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  padding: 0.5em 0.5em;
  width: 7em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  float: right;

  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    /* transform: translateX(-50%); */
    width: 0;
    height: 100%;
    background: red;
    z-index: -1;
    transition: width 150ms ease-in-out;
  }
  
  &:hover {
    color: #000;
    &:after {
      width: 110%;
    }
  }
}

.sign-btn {
  border-color: rgb(181, 213, 255);
  border-radius: 0.1;
  color: rgb(181, 213, 255);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 150ms ease-in-out;
  background: black !important;
  
  &:after {
    background: rgb(181, 213, 255);
  }
  
  &:hover {
    color: #000;
    &:after {
      width: 110%;
    }
  }
}

.cancel-btn {
  border-color: red;
  border-radius: 0.1;
  color: red;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 150ms ease-in-out;
  background: black !important;
}

.delete-btn {
  border-color: red;
  border-radius: 0.1;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 150ms ease-in-out;
  background: red !important;

  &:after {
    background: black;
  }
  
  &:hover {
    color: red;
    &:after {
      width: 110%;
    }
  }
}

.details-btn {
  border-color: white;
  border-radius: 0.1;
  color: white;
  width: 9em;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 150ms ease-in-out;
  background: black !important;
  margin: 0 1em;

  &:after {
    background: white;
  }
  
  &:hover {
    color: black;
    &:after {
      width: 110%;
    }
  }
}

.collapsible {
  cursor: default;
  width: 100%;
  height: 100%;
  padding: 0;
  margin-bottom: 0.2em;
  font-family: $font-header;
  &:hover {
    cursor: pointer;
  }
}

.details-bottom {
  align-self: flex-end;
  justify-content: flex-end;
  display: flex;
  width: 35%;
}

.content {
  padding: 1em 3em;
  height: auto;
  background-color: rgb(0, 0, 0);
}

.details {
  color: $text-color-standard;
  font-size: 1rem;
  padding: 1em;
  font-family: $font-text;
  font-weight: 300;
  display: flex;
  border-top: 1px solid grey;
  text-align: justify;
}

.session {
  padding: 1em;
  color: $text-color-standard;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  text-align: justify;
}

.session-date {
  color: white;
  padding: 1em 0;
  height: auto;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  justify-content: center;
}

.center {
  margin: auto 0;
  width: 25%;
}

.description {
  padding: 0 2em 0 0;
  width: 40%;
}

.info {
  width: 25%;
}

.signed {
  background: $secondary-color;
}

.unsigned {
  background: rgb(255, 255, 255);
}

.btn-disabled {
  background: rgb(41, 41, 41);
  color: rgb(110, 110, 110);
  pointer-events: none;
  border-color: rgb(110, 110, 110);
}
</style>