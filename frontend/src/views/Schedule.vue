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
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Schedule",
  components: {Session},
  data(){
    return  {
      sessions:{}
    };
  },
  computed: {
    ...mapGetters(['getSessions'])
  },
  async created(){
    await this.onFetch();
   },
  methods:{
    ...mapActions(['fetch']),
    onFetch: async function(){
      await this.fetch();
      this.sessions= this.getSessions;
    }
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