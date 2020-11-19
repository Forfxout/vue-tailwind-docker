import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// Store functionality
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// Create a new store
const store = new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
