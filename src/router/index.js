import Vue from 'vue'
import VueRouter from 'vue-router'
import vHome from '../views/home.vue'
import vWorks from '../views/works.vue'
import vUser from '../components/user.vue'

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
    component:vWorks,
  },
  {
    path:'/profile',
    name:'profile',
    component:vUser,
    beforeEnter: (to, from, next) => {
      
      if(localStorage.getItem('token') === null || from.name == null){
        next({name:'home'});
        return;
      }
      next();
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
