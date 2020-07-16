import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '@/views/Cart'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
