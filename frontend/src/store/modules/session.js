import axios from 'axios';

const state ={
  sessions:[],
  allSessions:[]
};

const getters = {
  getSessions: state => state.sessions,
  getAllSessions: state => state.allSessions,
  getSessionById: (state, id) => {
    const index = state.sessions.findIndex(item => item._id === id);
    return state.sessions[index];
  }
};

const actions = {
  async fetch({commit}, date) {
    try {
      const response = await axios.get('http://localhost:5000/session',{ 
      params: {
        date
      }});
      commit("saveSessions", response.data);
    } catch (error) {
      console.log("ERROR");
    }
  },
  async saveSession({commit}, session) {
    commit("updateSession", session);
  },
  async fetchAll({commit}, date) {
    try {
      const response = await axios.get('http://localhost:5000/sessions');
      commit("saveAllSessions", response.data);
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
  saveAllSessions: (state, response) => (state.allSessions = response.sessions),
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