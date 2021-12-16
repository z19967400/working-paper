import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// modules
import Login from './module/login'
import Index from './module/index'
import layout from './module/layout'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
    Index,
    layout
  }
})
