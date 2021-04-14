import axios from 'axios'

const state = {
  loggedIn: false,
  status: {},
  user: {}
}

const getters = {
  isLoggedIn: state => state.loggedIn,
  getStatus: state => state.status,
  getFullName: state => state.user.firstname + ' ' + state.user.lastname
}

const actions = {
  async login({ commit }, form) {
    const response = await axios.post('http://localhost:5000/api/login', form)
    if (response.data.token) {
      const token = response.data.token;
      if(token){
        localStorage.setItem("jwt", token);
        commit('updateUser', response.data)
      }
    }
    commit('setStatus', response.data);
  },
  async register({ commit }, form) {
    const response = await axios.post('http://localhost:5000/api/register', form)
    const token = response.data.token;
    if(token){
      localStorage.setItem("jwt", token);
    }
    commit('setStatus', response.data);

  }
}
const mutations = {
  setStatus: (state, response) =>
    (state.status = { success: response.status, error: response.error}),
  updateUser: (state, response) => {
    state.user = response.user
    state.loggedIn = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}