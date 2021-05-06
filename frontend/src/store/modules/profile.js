import axios from 'axios';

const state = {
  loggedIn: false,
  status: {},
  user: {}
};

const getters = {
  isLoggedIn: state => state.loggedIn,
  getStatus: state => state.status,
  getUserDetails: state => state.user,
  isAdmin: state => state.user.role == 'admin'
};

const actions = {
  async login({ commit }, form) {
    try {
      const response = await axios.post('http://localhost:5000/login', form);
    if (response.data.status) {
      const token = response.data.token;
      if(token){
        localStorage.setItem("jwt", token);
        commit('updateUser', response.data.user);
      }
    }
    commit('setStatus', response.data);
    } catch (error) {
      console.log("ERROR");
    }
  },
  async logout({ commit }) {
    localStorage.removeItem("jwt");
    commit('logoutUser');
  },
  async register({ commit }, form) {
    try {
      const response = await axios.post('http://localhost:5000/register', form);
      const token = response.data.token;
      if(token){
        localStorage.setItem("jwt", token);
      }
      commit('setStatus', response.data);
      commit('updateUser', response.data.user);
    } catch (error) {
      console.log("ERROR");
    }
  },
  async saveUser({ commit }, user) {
    commit('updateUser', user);
  },
};
const mutations = {
  setStatus: (state, response) =>
    (state.status = { success: response.status, error: response.error}),
  updateUser: (state, response) => {
    state.user = response;
    state.loggedIn = true;
  },
  logoutUser:(state) => {
    state.user = {},
    state.loggedIn = false;
    state.status = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};