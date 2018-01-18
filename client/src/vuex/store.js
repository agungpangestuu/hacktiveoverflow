import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jwt-decode'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://35.186.155.3:3005',
  headers: {'token': localStorage.getItem('token')}
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
  dataUser: {},
  data_Answer: [],
  answerUser: [],
  data_Question: {}
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
  },
  setDataAnswer (state, payload) {
    state.data_Answer = payload
  },
  setAnswerUser (state, payload) {
    state.data_Answer.push(payload)
  },
  setVote (state, payload) {
    state.data_Question.vote.push(payload)
  },
  setDataQuestion (state, payload) {
    state.data_Question = payload
  },
  setDataVote (state, payload) {
    state.data_Question.vote.forEach((data, i) => {
      if (data === state.dataUser.id) {
        return state.data_Question.vote.splice(i, 1)
      }
    })
  },
  pushVoteAnswer (state, payload) {
    for (let vote in state.data_Answer) {
      if (vote.hasOwnProperty(vote) && vote._id === payload) {
        vote.vote.push(state.dataUser.id)
      }
    }
  },
  pullVoteAnswer (state, payload) {
    for (let vote in state.data_Answer) {
      if (vote.hasOwnProperty(vote) && vote._id === payload) {
        vote.vote.forEach((data, i) => {
          if (data === state.dataUser.id) {
            return vote.vote.splice(i, 1)
          }
        })
      }
    }
  }
}

const actions = {
  SignUp () {
    return new Promise((resolve, reject) => {
      http.post('/api/users', state.signUp)
        .then(({data}) => {
          resolve(data.data)
        })
        .catch(err => reject(err))
    })
  },
  clearSign ({commit, state}) {
    state.signUp.fullname = ''
    state.signUp.email = ''
    state.signUp.password = ''
    state.signUp.username = ''
  },
  signIn ({commit}) {
    return new Promise((resolve, reject) => {
      http.post('/api/users/login', state.login)
        .then(({data}) => {
          resolve(data)
          actions.decode()
          state.login.username = ''
          state.login.password = ''
          commit('isLogin', true)
        })
        .catch(err => {
          console.error(err)
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
    window.location.reload()
    commit('isLogin', false)
  },
  askCreate () {
    http.post('/api/question', state.formCreate)
      .then(({data}) => {
        state.data.push(data.data)
      })
      .catch(err => {
        alert('you Must Login')
        console.log(err)
      })
  },
  getAllQuestion ({commit}) {
    http.get('/api/question')
      .then(({data}) => {
        commit('setData', data.data)
      })
      .catch(err => console.log(err))
  },
  getQuestById ({commit}, id) {
    http.get(`/api/question/${id}`)
      .then(({data}) => {
        // console.log(data)
        // resolve(data.data)
        commit('setDataQuestion', data.data)
      })
      .catch(err => console.log(err))
  },
  removeQuest ({commit}, id) {
    http.delete(`/api/question/${id}`)
      .then(data => {
        console.log('sukses')
      })
      .catch(() => {
        alert('you Must Login')
      })
  },
  updateQuest ({commit}, data) {
    let quest = {
      title: data.title,
      question_content: data.question_content
    }
    return new Promise((resolve, reject) => {
      http.put(`/api/question/${data._id}`, quest)
        .then(data => {
          console.log('sukses')
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
          alert('you Must Login')
        })
    })
  },
  postAnswer ({commit}, dataAnswer) {
    return new Promise((resolve, reject) => {
      http.post(`/api/answer/`, dataAnswer)
        .then(({data}) => {
          // console.log(data)
          // commit('setAnswerUser', dataAnswer)
          resolve(data)
        })
        .catch(err => {
          alert('you Must Login')
          reject(err)
        })
    })
  },
  getAnswerByQuestion ({commit}, id) {
    return new Promise((resolve, reject) => {
      http.get(`/api/answer/questions/${id}`)
        .then(({data}) => {
          commit('setDataAnswer', data)
          resolve(data)
        })
        .catch(err => {
          alert(err)
        })
    })
  },
  removeAnswer ({commit}, id) {
    http.delete(`/api/answer/${id}`)
      .then(data => console.log('sukses'))
  },
  decode ({commit}) {
    var decoded = jwt(localStorage.getItem('token'))
    commit('setDataUser', decoded)
  },
  manipulasiAnswer ({commit}, payload) {
    commit('setAnswerUser', payload)
  },
  voteQuest ({commit}, payload) {
    let status = state.data_Question.vote.includes(state.dataUser.id.toString())
    if (!status) {
      commit('setVote', state.dataUser.id)
    }
    else {
      commit('setDataVote', state.dataUser.id)
    }
    http.put(`/api/question/vote/${payload}`, {})
      .then(result => {
        console.log('sukses update')
        // commit('setDataQuestion', result.data)
      })
      .catch(() => {
        alert('You Must Login')
      })
  },
  voteAnswer ({commit}, payload) {
    let status = state.data_Question.vote.includes(state.dataUser.id.toString())
    if (status) {
      commit('pullVoteAnswer', payload)
    }
    else {
      commit('pushVoteAnswer', payload)
    }
    http.put(`/api/answer/vote/${payload}`, {})
      .then(data => {
        console.log('sukses like')
      })
      .catch(() => {
        alert('You Must Login')
      })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
