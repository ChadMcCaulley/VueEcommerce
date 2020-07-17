import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Autocomplete from '@/components/Autocomplete'
import axios from 'axios'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '@/registerServiceWorker'
import '@/plugins/vee-validate'
import mixins from '@/mixins'

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL || ''

Vue.config.productionTip = false

Vue.component('Autocomplete', Autocomplete)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.mixin(mixins)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
