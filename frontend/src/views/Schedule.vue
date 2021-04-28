<template>
  <div class="schedule">
    <div class="info">
      <div id="title">
        SIGN UP
      </div>
    <hr class="line">
      <div class="date">
        <button @click="onPrev">
          Prev
        </button>
        {{ date.toDateString() }}
        <button @click="onNext">
          Next
        </button>
      </div>
      <div class="space-between">
        <div>Time</div>
        <div>Activity</div>
        <div>Slots</div>
      </div>
    </div>
    <div class="flex">
      <div class="container">
        <div
          v-for="session in sessions"
          :key="session.id"
        >
          <Session
            v-if="!loading && true"
            :session="session"
          />
        </div>
      </div>
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
      loading: true
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
      this.loading = false;
    },
    onPrev: async function(){
      this.loading = true;
      this.date.setDate(new Date(this.date).getDate() - 1);
      await this.onFetch();
    },
    onNext: async function(){
      this.loading = true;
      this.date.setDate(new Date(this.date).getDate() + 1);
      await this.onFetch();
    }
  }
};
</script>

<style lang="scss" scoped>
.date{
  margin: 1em;
  font-size: 2rem;
}
.info{
  width: 60%;
  margin: auto;
}
#title{
  font-size: 5rem;
  text-align: left;
  padding: 1em 0;
}
.flex{
  display:flex;
  justify-content: center;
}
.space-between{
  display: grid;
  grid-template-columns: 15vw 25vw 0vw;
  font-weight: bold;
  margin: 0.5em 0;
  font-size: 1.2rem;
}
.container{
  width: 60%;
}
.schedule{
  width: 100vw;
  height: auto;
  margin-bottom: 10em;
}
</style>