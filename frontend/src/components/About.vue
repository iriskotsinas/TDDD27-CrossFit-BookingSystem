<template>
  <div id="about">
    <div class="title">
      About Us
    </div>
    
    <div class="image">
      <img
        src="../assets/cross2.jpeg"
        alt=""
      >
    </div>
    <div class="text-container">
      <div class="text">
        <h2>
          Our Equipment
        </h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </div>
    </div>
    <div class="image-flipped">
      <img
        src="../assets/cross2.jpeg"
        alt=""
      >
    </div>
    <div class="text-container-flipped">
      <div class="text">
        <h2>
          Proven Methods
        </h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </div>
    </div>

    <div class="programs">
      <h1>
        Our memberships
      </h1>
      <hr class="line">
      <div class="cards-container">
        <div class="card">
          <h2>Bronze</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          <h3>39.99$</h3>
        </div>
        <div class="card">
          <h2>Silver</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          <h3>49.99$</h3>
        </div>
        <div class="card">
          <h2>Gold</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          <h3>59.99$</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang= "scss" scoped>
.title{
  font-size: 5rem;
  font-family: $font-header;
  padding-top: 2em;
  height: 2em;
}
.cards-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
}
.card{
  min-height: 30em;
  height: auto;
  background: rgb(54, 54, 54);
  padding: 2em;

  h2{
    font-family: $font-header;
    font-size: 2.5rem;
  }
  h3{
    font-size: 3rem;
  }
}
.programs{
  width: 60%;
  margin: auto;
  margin-bottom: 4em;

  h1{
    font-size: 3rem;
     font-family: $font-header;
  }
}
.line{
  margin: 2em;
  border: 1px solid $secondary-color;
}
.text-container {
  margin: auto;
  background: rgb(54, 54, 54);
  width: 40vw;
  max-width: 30em;
  height: auto;
  min-height: 40vh;
  transform: translate(50%, -70%);
}
.text-container-flipped {
  margin: auto;
  background: rgb(54, 54, 54);
  width: 40vw;
  max-width: 30em;
  height: auto;
  min-height: 40vh;
  transform: translate(-50%, -70%);
}
.image {
  min-height: 40em;
  img{
    height: auto;
    width: 60vw;
    max-width: 50em;
    transform: translate(-10%);
    
  }
}
.image-flipped {
  min-height: 40em;
  img{
    height: auto;
    width: 60vw;
    max-width: 50em;
    transform: translate(10%);
    
  }
}
.text{
  padding: 0.2em 2em 2em 2em;

  h2{
    font-family: $font-header;
    font-size: 2.5rem;
  }
}

</style>