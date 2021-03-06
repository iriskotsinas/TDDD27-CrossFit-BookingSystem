import { createStore} from 'vuex';
import profile from './modules/profile';
import session from './modules/session';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {profile, session},
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ]
});

export default store;