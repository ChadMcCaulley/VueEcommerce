import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '@/views/Cart'
import NotFound from '@/views/NotFound'
import Home from '@/views/Home'
import Product from '@/views/Product'
import ProductReview from '@/views/ProductReview'
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
  },
  {
    path: '/product/:title/:id',
    name: 'product',
    component: Product,
    props: true
  },
  {
    path: '/product/:title/:id/review-form',
    name: 'review-form',
    component: ProductReview
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
