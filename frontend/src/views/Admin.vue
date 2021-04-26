<template>
  <div
    v-if="isLoggedIn"
    class="admin"
  >
    <div class="content-container">
      <form @submit.prevent="onSubmit">
        <div class="container">
          <label for="activity"><b>Activity</b></label>
          <input
            v-model="form.activity"
            type="text"
            placeholder="Enter First Name"
            name="firstname"
            required
          >
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

          <label for="maxSlots"><b>Slots</b></label>
          <input
            v-model="form.maxSlots"
            type="number"
            placeholder="Enter Number of Slots Available"
            name="slots"
            required
          >
          <label for="description"><b>Description</b></label>
          <input
            v-model="form.description"
            type="text"
            placeholder="Enter Description"
            name="description"
            required
          >
          <label for="instructor"><b>Instructor</b></label>
          <input
            v-model="form.instructor"
            type="text"
            placeholder="Enter Description"
            name="instructor"
            required
          >
          <label for="length"><b>Length</b></label>
          <input
            v-model="form.length"
            type="number"
            placeholder="Enter Length"
            name="length"
            required
          >
          <div id="error">
            {{ error_message }}
          </div>
          <button
            type="submit"
            :disabled="!form.date"
          >
            Submit Session
          </button>
        </div>
      </form>
    </div>
    <h1>Admin page</h1>
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
#error{
  color: red;
}
.register {
  display: flex;
  justify-content: center;
}

.content-container {
  display: inline-flex;
  justify-content: space-evenly;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 30em;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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