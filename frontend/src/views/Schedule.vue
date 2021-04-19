<template>
  <div class="schedule">
    Boka pass
    <div
      v-for="session in sessions"
      :key="session.id"
      class="center"
    >
      <Session :session="session" />
    </div>
  </div>
</template>

<script>
import Session from "../components/Session";
export default {
  name: "Schedule",
  components: {Session},
  data(){
    return  {
      sessions:[
        {
          id: 1,
          title: "Session 1",
          data: Date.now
        },
        {
          id: 2,
          title: "Session 2",
          data: Date.now
        },
        {
          id: 3,
          title: "Session 3",
          data: Date.now
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.center{
  // height: 50em;
  width: 60em;
  margin: auto;
  display: flex;
  background-color: blue;
}
</style>