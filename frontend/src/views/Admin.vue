<template>
  <div
    v-if="isLoggedIn"
    class="admin"
  >
    <h1>Add new session</h1>
    <form
      id="form"
      class="content-container"
      @submit.prevent="onSubmit"
    >
      <div class="session-data">
        <div class="grid-left">
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
              class="date-picker"
              color="red"
              :min-date="new Date()"
              is-dark
              mode="dateTime"
              :attributes="attrs"
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
        </div>
        <div class="grid-left">
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
      </div>
      <div id="error">
        {{ error_message }}
      </div>
      <button
        id="submit"
        type="submit"
        :disabled="!form.date"
      >
        Submit session
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
      error_message: '',
      attrs: [
        {
          key: 'today',
          highlight: 'gray',
          dates: new Date(),
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['getUserDetails', 'isLoggedIn', 'isAdmin']),
  },
  created() {
    if (!this.isLoggedIn || !this.isAdmin) {
      this.$router.replace("/");
    }
    this.user = this.getUserDetails;
  },
  methods:{
    errorMessage: function(now) {
      if (!this.form.date) {
        this.error_message = 'Date is required.';
      } else if (this.form.date < now) {
        this.error_message = 'Pick a later time';
      } else {
        this.error_message = '';
      }
    },
    onSubmit: async function() {
      const now = new Date();
      if (!this.form.date || this.form.date < now) {
        this.errorMessage(now);
      } else {
        this.error_message = '';
        try {
          this.form.date.setTime( this.form.date.getTime() - this.form.date.getTimezoneOffset()*60*1000 );
          await axios.post('http://localhost:5000/api/booking', this.form, 
          {
            headers: { 'auth-token': localStorage.getItem('jwt')},
          });
          document.getElementById("form").reset();
        } catch(err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.admin {
 margin: 10em 0;
}

#error {
  color: red;
}

.add-session {
  color: white;
  font-size: 25px;
  margin: auto;
  margin-top: 1em;
  font-weight: bold;
  text-align: left;
}

.register {
  display: flex;
  justify-content: center;
}

.content-container {
  margin: 0 6em;
}

.session-data {
  display: flex;
  width: 100%;
  margin: auto;
}

.grid-left {
  display: grid;
  width: 50%;
  justify-content: space-evenly;
  margin: 2em 0 0 0;
}

/* Full-width inputs */
input[type=text], input[type=password], input[type=number] {
  width: 30em;
  padding: 1em 2em;
  margin: .8em 0;
  display: inline-block;
  border: 1px solid #ccc;
  background-color: $background-color;
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
  width: 25em;
  align-self: center;
  margin-top: 4em;
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

.date-picker {
  input {
    width: 30em;
    padding: 1em 2em;
    margin: .8em 0;
    display: inline-block;
    border: 1px solid #ccc;
    background-color: $background-color;
    color: white;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
      outline-color: white;
    }
    
    &:focus {
      outline-color: white;
    }
  }
}

</style>