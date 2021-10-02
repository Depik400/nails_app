import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios/index';
import vueAxios from 'vue-axios'
import store from './store'

Vue.use(vueAxios,axios);

Vue.config.productionTip = false

new Vue({
  axios: axios,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
