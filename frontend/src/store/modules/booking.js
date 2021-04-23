import axios from 'axios';


const state ={
  sessions:[]
};
const getters = {
  getSessions: state => state.sessions
};
const actions = {
  async fetch({commit}) {
    try {
      const response = await axios.get('http://localhost:5000/api/booking');
      console.log(response.data);
      commit("saveSessions", response.data);
    } catch (error) {
      console.log("ERROR");
    }
  },
};
const mutations = {
  saveSessions: (state, response) => (state.sessions = response)
};
export default {
  state,
  getters,
  actions,
  mutations
};