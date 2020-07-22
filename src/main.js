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
import RatingIcons from '@/components/RatingIcons'
import PasswordInput from '@/components/PasswordInput'
import filters from '@/filters'
import mixins from '@/mixins'
import '@/registerServiceWorker'
import '@/plugins/vee-validate'

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL || ''

Vue.config.productionTip = false

Vue.component('Autocomplete', Autocomplete)
Vue.component('ItemCard', ItemCard)
Vue.component('RatingIcons', RatingIcons)
Vue.component('PasswordInput', PasswordInput)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.mixin(mixins)
Vue.mixin({ filters })

Vue.use(VueCookies)
Vue.$cookies.config('7d')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
