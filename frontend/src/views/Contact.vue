<template>
  <div class="container">
    <!-- <img
      class="image"
      src="../assets/cross2.jpeg"
      alt=""
    > -->
    <div class="col">
      <h2>How to find us</h2>
      <p>
        If you have any questions, just fill in the contact form, and we will answer you shortly. If you are living nearbly, come visit one of our facilities! We are happy to answer questions via phone and are frequently present in the box.
      </p>
      <h3>
        Norrköping
      </h3>
      <p>Drottninggatan 53a, 60232 NORRKÖPING, SWEDEN</p>
      <p>Phone: +46 2322 212 12</p>
      <p>Email: crossfit@hotmail.com</p>
    </div>
    <div class="col">
      <h2>Get in touch</h2>
      <p>Fill in the form to contact us or send us an email. We'll get back to you within two workdays.</p>
      <form
        class="form-container"
        @submit.prevent=""
      >
        <label
          class="label"
        ><b>Name</b></label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          required
        >
        <label
          class="label"
        ><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          required
        >
        <label
          class="label"
        ><b>Message</b></label>
        <input
          type="text"
          placeholder="Enter message"
          name="message"
          required
        >
        <div id="error">
          {{ error_message }}
        </div>

        <button type="submit">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
};
</script>

<style lang= "scss" scoped>
.col{
  width: 100%;
  padding: 3em;
  h2{
    font-size: 3rem;
  }
  h3{
    font-size: 2rem;
  }
}
.container{
  margin: auto;
  max-width: 70em;
  text-align: left;
  margin-top: 7em;
  display: flex;
  justify-content: space-around;
}
.form-container{
  display: grid;
  width: 50%;
}
.image{
  margin-top: 4vh;
  position: relative;
  height: 20vh;
  width: 100vw;
}
.contact{
  font-size: 2rem;
  font-family: $font-header;
  margin-top: 2em;
  height: auto;
}

#error {
  color: red;
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
  background-color: $background-color;
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


/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

</style>