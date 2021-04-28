<template>
  <div class="login">
    <div class="signUp">
      My account
    </div>
    <div class="content-container">
      <form
        class="container"
        @submit.prevent="onLogin"
      >
        <div class="heading">
          Login
        </div>
        <label
          for="email"
          class="label"
        ><b>Email</b></label>
        <input
          v-model="form.email"
          type="text"
          placeholder="Enter email"
          name="email"
          required
        >
        <br>
        <label
          for="password"
          class="label"
        ><b>Password</b></label>
        <input
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          name="password"
          required
        >
        <div id="error">
          {{ error_message }}
        </div>

        <button type="submit">
          Login
        </button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </form>

      <div class="register">
        <div class="heading">
          Register
        </div>
        <p>Want to become a tougher you?</p>
        <p>Become a member today.</p>
        <router-link
          to="/register"
        >
          <button id="register-btn">
            Register here
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Login",
  data(){
    return {
      form:{
        email: '',
        password: ''
      },
      error_message: ''
    };
  },
  computed: {
    ...mapGetters(['getStatus'])
  },
  methods:{
    ...mapActions(['login']),
    onLogin: async function() {
      try {
        await this.login(this.form);
        let status = this.getStatus;
        if(status.success){
          this.$router.replace('/');
        }
        else{
          this.error_message = this.getStatus.error;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

};
</script>

<style lang="scss" scoped>

#error {
  color: red;
}

.heading {
  color: white;
  justify-self: left;
  font-size: 30px;
  margin-bottom: 1em;
  font-weight: bold;
}

.login {
  display: grid;
  grid-template-columns: auto;
}

.label {
  justify-self: left;
  color: white;
}

.content-container {
  display: flex;
  width: 100%;
  margin: auto;
}

.register {
  width: 50%;
  margin: auto;
  color: white;
}

/* Add padding to containers */
.container {
  padding: 1em;
  display: grid;
  width: 50%;
  justify-content: space-evenly;
  margin: 4em 0 0 0;
  border-right: 2px solid red;
}

.signUp {
  color: white;
  font-size: 40px;
  margin: auto;
  margin-top: 2em;
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

/* Set a style for all buttons */
button {
  background-color: $secondary-color;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline-color: white;
  }
}

#register-btn {
  width: 40%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* The "Forgot password" text */
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