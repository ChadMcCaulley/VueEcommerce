import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Autocomplete from '@/components/Autocomplete'
import ItemCard from '@/components/ItemCard'
import PasswordInput from '@/components/PasswordInput'
import mixins from '@/mixins'
import '@/registerServiceWorker'
import '@/plugins/vee-validate'

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL || ''

Vue.config.productionTip = false

Vue.component('Autocomplete', Autocomplete)
Vue.component('ItemCard', ItemCard)
Vue.component('PasswordInput', PasswordInput)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.mixin(mixins)

Vue.use(VueCookies)
Vue.$cookies.config('30d')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
