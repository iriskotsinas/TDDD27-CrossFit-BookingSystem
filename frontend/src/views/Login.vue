<template>
  <div class="login">
    <div class="content-container">
      <form @submit.prevent="onLogin">
        <div class="container">
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
          <div id="error">
            {{ error_message }}
          </div>
          <button type="submit">
            Login
          </button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
      <div class="register">
        <router-link
          class="register-btn"
          to="/register"
        >
          <button>
            Register
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
  },
  computed: {
    ...mapGetters(['getStatus'])
  }
};
</script>

<style lang="scss" scoped>
#error{
  color: red;
}
.login {
  display: grid;
  grid-template-columns: auto;
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