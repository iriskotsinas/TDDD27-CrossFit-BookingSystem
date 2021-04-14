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
    if (response.data.success) {
      commit('updateUser', response.data)
      localStorage.token = response.data.token
    } else {
      commit('setStatus', response.data)
    }
  },
  async register({ commit }, form) {
    const response = await axios.post('http://localhost:5000/api/register', form)
    commit('setStatus', response.data)
  },
  async getUserByToken({ commit }) {
    const response = await axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
    if (response.data.success) {
      commit('updateUser', response.data)
    }
  },
}
const mutations = {
  setStatus: (state, response) =>
    (state.status = { success: response.success, message: response.message }),
  updateUser: (state, response) => {
    state.status = { success: response.success, message: response.message }
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