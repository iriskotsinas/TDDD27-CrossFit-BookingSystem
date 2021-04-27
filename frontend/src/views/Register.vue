<template>
  <div class="signUp">
    Register
  </div>
  <div class="register">
    <div class="content-container">
      <form
        class="container"
        @submit.prevent="onRegister"
      >
        <label
          class="label"
          for="firstname"
        ><b>First name</b></label>
        <input
          v-model="form.firstname"
          type="text"
          placeholder="Enter first name"
          name="firstname"
          required
        >
        <label
          class="label"
          for="lastname"
        ><b>Last name</b></label>
        <input
          v-model="form.lastname"
          type="text"
          placeholder="Enter last name"
          name="lastname"
          required
        >

        <label
          class="label"
          for="email"
        ><b>Email</b></label>
        <input
          v-model="form.email"
          type="text"
          placeholder="Enter email"
          name="email"
          required
        >
        <label
          class="label"
          for="password"
        ><b>Password</b></label>
        <input
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          name="password"
          required
        >
        <input
          v-model="passwordRepeat"
          type="password"
          placeholder="Enter password again"
          name="passwordRepeat"
          required
        >
        <div id="error">
          {{ error_message }}
        </div>
        <button type="submit">
          Register
        </button>
        <br>
      </form>
      <div class="account">
        Already have an account?
        <router-link to="/login">
          <button id="login-btn">
            Log in
          </button>
        </router-link>
      </div>
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
  display: flex;
  width: 100%;
  margin: auto;
}

.signUp {
  color: white;
  font-size: 40px;
  margin: auto;
  margin-top: 1em;
  font-weight: bold;
}

/* Full-width inputs */
input[type=text], input[type=password] {
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

#login-btn {
  width: 40%;
  margin: 2em 0 0 0;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Add padding to containers */
.container {
  padding: 1em;
  display: grid;
  width: 50%;
  justify-content: space-evenly;
  margin: 2em 0 0 0;
  border-right: 2px solid red;
}

.account {
  width: 50%;
  margin: auto;
  color: white;
  display: grid;
}

span.psw {
  float: right;
  padding-top: 16px;
  color: white;
  a {
    color: red;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
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