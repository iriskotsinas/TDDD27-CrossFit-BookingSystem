<template>
  <div class="container">
    <div class="poster">
      <img
        src="../assets/cross2.jpeg"
        alt="crossfit"
      >
      <div class="center-text">
        WE ARE POWER
      </div>
    </div>
    <About />
    <Contact />
  </div>
</template>

<script>
import About from '../components/About';
import Contact from '../components/Contact';
export default {
  name: "Home",
  components:{
    About,
    Contact
  }
};
</script>

<style lang= "scss" scoped>
.box {
  width: 80vw;
  height: 50vh;
  margin: 10em auto;
  background-color: $primary-color;
  padding: 1em;
}

.text-header {
  font-size: 3rem;
  height: 20%;
  color: $secondary-color;
}

.text {
  display: flex;
  float: left;
  width: 50%;
  height: 80%;

}
.content-container {
  display: inline-flex;
  justify-content: space-evenly;
}

.image {
  display: flex;
  float: right;
  width: 30vw;
  height: 30vh;
  background: rgb(206, 206, 206);
}

img {
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: gray;
}

.poster {
  height: 100vh;
  width: 100%;
  background-color: gray;
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  font-weight: bold;
  font-family: $font-header;
}

</style>