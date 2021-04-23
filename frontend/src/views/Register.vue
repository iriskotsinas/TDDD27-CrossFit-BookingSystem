<template>
  <div class="register">
    <div class="content-container">
      <form @submit.prevent="onRegister">
        <div class="container">
          <label for="firstname"><b>First Name</b></label>
          <input
            v-model="form.firstname"
            type="text"
            placeholder="Enter First Name"
            name="firstname"
            required
          >
          <label for="lastname"><b>Last Name</b></label>
          <input
            v-model="form.lastname"
            type="text"
            placeholder="Enter Last Name"
            name="lastname"
            required
          >

          <label for="email"><b>Email</b></label>
          <input
            v-model="form.email"
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          >
          <label for="password"><b>Password</b></label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          >
          <input
            v-model="passwordRepeat"
            type="password"
            placeholder="Enter Password Again"
            name="passwordRepeat"
            required
          >
          <div id="error">
            {{ error_message }}
          </div>
          <button type="submit">
            Register
          </button>
          <span class="psw">Forgot <a href="#">password?</a></span>
          <div class="account">
            Already have an account? <router-link to="/login">
              <button>Log in</button>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Register",
  data(){
    return {
      form:{
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      passwordRepeat: '',
      error_message: ''
    };
  },
  computed: {
    ...mapGetters(['getStatus'])
  },
  methods: {
    ...mapActions(['register']),
    onRegister: async function(){
      try {
        if (this.form.password === this.passwordRepeat) {
        await this.register(this.form);
        let status = this.getStatus;
        console.log(status);
        if (status.success) {
          this.$store.state.loggedIn = true;
          this.$router.replace('/');
        } else {
          this.error_message = status.error;
        }
      } else {
        this.error_message = 'Passwords do not match';
      }
    } catch (error ) {
      console.log(error);
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

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}

</style>