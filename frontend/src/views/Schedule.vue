<template>
  <div class="schedule">
    Boka pass
    <button @click="onPrev">
      Prev
    </button>
    <button @click="onNext">
      Next
    </button>
    <div
      v-for="session in sessions"
      :key="session.id"
      class="center"
    >
      <Session
        v-if="!Loading"
        :session="session"
      />
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
      sessions:{},
      date: new Date(Date.now()),
      Loading: true
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
      console.log(this.date);
      await this.fetch(this.date.toDateString());
      this.sessions= this.getSessions;
      this.Loading = false;
    },
    onPrev: async function(){
      this.Loading = true;
      this.date.setDate(new Date(this.date).getDate() - 1);
      await this.onFetch();
    },
    onNext: async function(){
      this.Loading = true;
      this.date.setDate(new Date(this.date).getDate() + 1);
      await this.onFetch();
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