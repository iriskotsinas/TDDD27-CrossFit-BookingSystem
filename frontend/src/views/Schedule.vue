<template>
  <div class="schedule">
    <div class="info">
      <div id="title">
        SIGN UP
      </div>
      <hr class="line">
      <div class="date">
        <a @click="onPrev">
          <img
            src="../assets/next.png"
            alt=""
            class="prev-btn"
          >
        </a>
        {{ date.toDateString() }}
        <a @click="onNext">
          <img
            src="../assets/next.png"
            alt=""
            class="next-btn"
          >
        </a>
      </div>
      <div class="sessions-header">
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
            @update-sessions="onUpdate"
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
    },
    onUpdate: async function(){
      this.sessions = this.getSessions;
    }
  }
};
</script>

<style lang="scss" scoped>
.schedule{
  width: 100vw;
  height: auto;
  min-height: 100vh;
  margin-bottom: 10em;
}
.date{
  margin: 1em;
  font-size: 2rem;
  font-family: $font-text;
  font-weight: 700;
  align-content: center;
  justify-content: center;
  display: flex;
}
.info{
  width: 60%;
  margin: auto;
}
#title{
  font-size: 5rem;
  text-align: left;
  padding: 1em 0;
  font-family: $font-header;
}
.flex{
  display:flex;
  justify-content: center;
}
.sessions-header{
  display: grid;
  grid-template-columns: 15vw 20vw 9vw;
  font-weight: bold;
  margin: 0.5em 0;
  font-size: 1.2rem;
}
.container{
  width: 60%;
}
.prev-btn{
  transform: rotate(180deg);
}
.date img{
  height: 1.2em;
  width: auto;
}
.date a{
  cursor: pointer;
  margin: 0 1em;
  
  &:hover{
    opacity: 0.6;
  }
}
</style>