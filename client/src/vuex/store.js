import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jwt-decode'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:3003'
})

const state = {
  isLogin: false,
  signUp: {
    fullname: '',
    email: '',
    password: '',
    username: ''
  },
  login: {
    username: '',
    password: ''
  },
  formCreate: {
    title: '',
    question_content: ''
  },
  data: [],
  dataUser: {}
}

const mutations = {
  isLogin (state, payload) {
    state.isLogin = payload
  },
  clearSign (state, payload) {
    state.signup = payload
  },
  setData (state, payload) {
    state.data = payload
  },
  setDataUser (state, payload) {
    state.dataUser = payload
  }
}

const actions = {
  SignUp () {
    console.log()
    return new Promise((resolve, reject) => {
      http.post('/api/users', state.signUp)
        .then(({data}) => {
          resolve(data.data)
        })
        .catch(err => reject(err))
    })
  },
  clearSign ({commit}) {
    let data = {
      fullname: '',
      email: '',
      password: '',
      username: ''
    }
    commit('clearSign', data)
  },
  signIn ({commit}) {
    return new Promise((resolve, reject) => {
      http.post('/api/users/login', state.login)
        .then(({data}) => {
          resolve(data)
          actions.decode()
          commit('isLogin', true)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  checkLogin ({commit}) {
    if (localStorage.getItem('token')) {
      commit('isLogin', true)
    }
    else {
      commit('isLogin', false)
    }
  },
  logout ({commit}) {
    localStorage.clear()
    commit('isLogin', false)
  },
  askCreate () {
    http.post('/api/question', state.formCreate, {headers: {'token': localStorage.getItem('token')}})
      .then(({data}) => {
        state.data.push(data.data)
      })
      .catch(err => console.log(err))
  },
  getAllQuestion ({commit}) {
    http.get('/api/question')
      .then(({data}) => {
        // console.log(data.data)
        commit('setData', data.data)
      })
      .catch(err => console.log(err))
  },
  getQuestById ({commit}, id) {
    return new Promise((resolve, reject) => {
      http.get(`/api/question/${id}`)
        .then(({data}) => {
          // console.log(data)
          resolve(data.data)
          // commit('setData', data.data)
        })
        .catch(err => console.log(err))
    })
  },
  removeQuest ({commit}, id) {
    http.delete(`/api/question/${id}`, {headers: {'token': localStorage.getItem('token')}})
      .then(data => {
        console.log('sukses')
      })
  },
  updateQuest ({commit}, data) {
    let quest = {
      title: data.title,
      question_content: data.question_content
    }
    return new Promise((resolve, reject) => {
      http.put(`/api/question/${data._id}`, quest, {headers: {'token': localStorage.getItem('token')}})
        .then(data => {
          console.log('sukses')
          resolve(data)
        })
        .catch(err => console.log('ini err', err))
    })
  },
  postAnswer ({commit}, data) {
    return new Promise((resolve, reject) => {
      http.post(`/api/answer/`, data, {headers: {'token': localStorage.getItem('token')}})
        .then(({data}) => {
          // console.log(data)
          resolve(data.data)
          // commit('setData', data.data)
        })
        .catch(err => console.log(err))
    })
  },
  getAnswerByQuestion ({commit}, id) {
    return new Promise((resolve, reject) => {
      http.get(`/api/answer/questions/${id}`)
        .then(({data}) => {
          console.log(data)
          resolve(data)
        })
        .catch(err => alert(err))
    })
  },
  removeAnswer ({commit}, id) {
    http.delete(`/api/answer/${id}`)
      .then(data => console.log('sukses'))
  },
  decode ({commit}) {
    var decoded = jwt(localStorage.getItem('token'))
    commit('setDataUser', decoded)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
