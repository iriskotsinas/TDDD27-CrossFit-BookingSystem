<template>
  <div class="login">
    <div class="content-container">
      <form method="post">
        <div class="container">
          <label for="uname"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="uname" required>
          
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
          <button type="submit">Login</button>
        </div>
      </form>
      <div class="register">
          <button type="submit">Register</button>
      </div>
    </div>
    <div class="container">
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
}
</script>

<style lang="scss" scoped>
form {
  /* width: 50em; */
}

.register {  
  button {
    width: 20em;
  }
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