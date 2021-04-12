<template>
  <div class="container">
    <Header/>
    <div class="poster">
      <div class="center-text">
        WE ARE POWER
      </div>
    </div>
    <div class="box">
      <div class="text-header">
        ABOUT US!
      </div>
      <div class="content-container">
      <div class="text">
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </div>
      <div class="image">

      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "Home",
  components: {
    Header
  }
}
</script>

<style lang= "scss" scoped>
.container{
  height: 200vh;
}
.box{
  width: 80vw;
  height: 50vh;
  margin: 10em auto;
  background-color: rgb(0, 0, 0);
  padding: 1em;
}
.text-header{
  font-size: 3rem;
  height: 20%;
  color: $secondary-color;
}
.text{
  display: flex;
  float: left;
  width: 50%;
  height: 80%;

}
.content-container{
  display: inline-flex;
  justify-content: space-evenly;
}
.image{
  display: flex;
  float: right;
  width: 30vw;
  height: 30vh;
  background: rgb(206, 206, 206);

}
.poster{
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: gray;
}
.center-text{
    font-size: 5rem;
    padding-top: 30vh;
}

</style>