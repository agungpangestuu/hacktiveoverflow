import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex)

const http = axios.create({
  baseUrl: 'http://localhost:3000'
})

const state = {
  isLogin: false
}

const actions = {
  SignUp (payload) {
    return new Promise ((resolve,reject) => {
      http.post('/api/users', payload)
      .then(({data}) => {
        resolve(data.data)
      })
      .catch(err => reject(err))
    })
  }
}

const store = new Vuex.Store({
  state,
  actions
})

export defaut store