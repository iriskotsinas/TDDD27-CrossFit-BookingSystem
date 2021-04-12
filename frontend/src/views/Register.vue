<template>
  <div class="register">
    <div class="content-container">
      <form method="post">
        <div class="container">
          <label for="firstname"><b>First Name</b></label>
          <input type="text" placeholder="Enter First Name" name="firstname" required>
          <label for="lastname"><b>Last Name</b></label>
          <input type="text" placeholder="Enter Last Name" name="lastname" required>

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
          <button type="submit">Login</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
}
</script>

<style lang="scss" scoped>

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