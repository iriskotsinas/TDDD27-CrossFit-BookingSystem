<template>
  <div class="session">
    <h1>{{ session.title }}</h1>
    <p>{{ session.date }}</p>
  </div>
</template>

<script>
export default {
  name: "Session",
  props: {
    session: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.session{
  height: 10em;
  width: 100%;
  // margin: auto;
  background-color: red;
}
</style>