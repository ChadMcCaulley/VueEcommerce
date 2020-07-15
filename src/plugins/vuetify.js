import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#7796CB',
        secondary: '#A3BCF9',
        accent: '#576490',
        error: '#b71c1c'
      },
      dark: {
        primary: '#7796CB',
        secondary: '#A3BCF9',
        accent: '#576490',
        error: '#b71c1c'
      }
    }
  }
})
