import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import SignIn from '@/views/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sign-in/',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/sign-up/',
    name: 'sign-up',
    component: SignIn
  }
]

const router = new VueRouter({
  routes
})

export default router
