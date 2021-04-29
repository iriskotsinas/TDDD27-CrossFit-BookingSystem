import axios from 'axios';


const state ={
  sessions:[]
};
const getters = {
  getSessions: state => state.sessions,
  getSessionById: async (state, id) => {
    const index = state.sessions.findIndex(item => item._id === id);
    return state.sessions[index];
  }
};
const actions = {
  async fetch({commit}, date) {
    try {
      const response = await axios.get('http://localhost:5000/api/booking',{ 
      params: {
        date
      }});
      console.log(response.data);
      commit("saveSessions", response.data);
    } catch (error) {
      console.log("ERROR");
    }
  },
  async saveSession({commit}, session) {
    commit("updateSession", session);
  },
};
const mutations = {
  saveSessions: (state, response) => (state.sessions = response),
  updateSession: (state, session) => {
    const index = state.sessions.findIndex(item => item._id === session._id);
    state.sessions[index] = session;
  }

};
export default {
  state,
  getters,
  actions,
  mutations
};