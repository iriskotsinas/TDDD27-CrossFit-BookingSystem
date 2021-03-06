import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import VCalendar from "v-calendar";
import store from './store';
createApp(App).use(router).use(store).use(VCalendar, {}).mount('#app');
