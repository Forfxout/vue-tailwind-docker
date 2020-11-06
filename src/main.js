import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'

// CSS Entry
import '@/assets/css/main.css'

Vue.config.productionTip = false
Vue.prototype.http = axios.create({ baseURL: process.env.VUE_APP_API_URL })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
