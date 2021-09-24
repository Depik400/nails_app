import Vue from 'vue'
import VueRouter from 'vue-router'
import vHome from '../views/home.vue'
import vWorks from '../views/works.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'home',
    component:vHome
  },
  {
    path:'/works',
    name:'works',
    component:vWorks
  }
]

const router = new VueRouter({
  routes
})

export default router
