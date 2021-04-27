<template>
  <div
    v-if="isLoggedIn"
    class="admin"
  >
    <h1>Admin page</h1>
    <div class="signUp">
      Add new session
    </div>
    <form
      class="content-container"
      @submit.prevent="onSubmit"
    >
      <div class="grid">
        <div class="wrapper">
          <label
            class="label"
            for="activity"
          ><b>Activity</b></label>
          <input
            v-model="form.activity"
            type="text"
            placeholder="Enter name of activity"
            name="activity"
            required
          >
        </div>
        <div class="wrapper">
          <label
            class="label"
            for="date"
          ><b>Date</b></label>
          <v-date-picker
            v-model="form.date"
            mode="dateTime"
            is-required
            is24hr
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                class=""
                :value="inputValue"
                v-on="inputEvents"
              >
            </template>
          </v-date-picker>
        </div>
        <div class="wrapper">
          <label
            class="label"
            for="maxSlots"
          ><b>Slots</b></label>
          <input
            v-model="form.maxSlots"
            type="number"
            placeholder="Enter number of slots available"
            name="slots"
            required
          >
        </div>
        <div class="wrapper">
          <label
            class="label"
            for="length"
          ><b>Length</b></label>
          <input
            v-model="form.length"
            type="number"
            placeholder="Enter length of session in minutes"
            name="length"
            required
          >
        </div>
        <div class="wrapper">
          <label
            class="label"
            for="instructor"
          ><b>Instructor</b></label>
          <input
            v-model="form.instructor"
            type="text"
            placeholder="Enter name of instructor"
            name="instructor"
            required
          >
        </div>
        <div class="wrapper">
          <label
            class="label"
            for="description"
          ><b>Description</b></label>
          <input
            v-model="form.description"
            type="text"
            placeholder="Enter description"
            name="description"
            required
          >
        </div>
      </div>
      <div id="error">
        {{ error_message }}
      </div>
      <button
        id="submit"
        type="submit"
        :disabled="!form.date"
      >
        Submit Session
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: "Admin",
  data(){
    return {
      user: this.getUserDetails,
      form:{
        activity: '',
        date: null,
        maxSlots: '',
        description: '',
        instructor: '',
        length: ''
      },
      error_message: ''
    };
  },
  computed: {
    ...mapGetters(['getUserDetails', 'isLoggedIn', 'isAdmin']),
    errorMessage() {
      if (!this.form.date) return 'Date is required.';
      return '';
    },
  },
  created(){
    if(!this.isLoggedIn || !this.isAdmin) {
      this.$router.replace("/");
    }
    this.user = this.getUserDetails;
  },
  methods:{
    onSubmit: async function(){
      try{
        this.form.date.setTime( this.form.date.getTime() - this.form.date.getTimezoneOffset()*60*1000 );
        await axios.post('http://localhost:5000/api/booking', this.form, 
        {
          headers: { 'auth-token': localStorage.getItem('jwt')},
        });
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#error {
  color: red;
}

.signUp {
  color: white;
  font-size: 25px;
  margin: auto;
  margin-top: 1em;
  font-weight: bold;
}

.register {
  display: flex;
  justify-content: center;
}

.content-container {
  display: grid;
  /* width: 100%; */
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* margin: 0 7em 0 7em; */
}

/* Full-width inputs */
input[type=text], input[type=password], input[type=number] {
  width: 30em;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  background-color: black;
  color: white;
  box-sizing: border-box;

  &:focus {
    outline-color: white;
  }
}

.wrapper {
  display: grid;
}

.label {
  justify-self: left;
  color: white;
  margin: 1em 0 0 0;
}

/* Set a style for all buttons */
button {
  background-color: $secondary-color;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

#submit {
  width: 30em;
  position: absolute;
  align-self: center;
  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Add padding to containers */
.container {
  padding: 16px;
  display: grid;
  justify-content: space-evenly;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

</style>