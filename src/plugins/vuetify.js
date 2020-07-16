import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6e1db5',
        secondary: '#435abf',
        accent: '#7543bf',
        error: '#b71c1c'
      },
      dark: {
        primary: '#31ad9b',
        secondary: '#a3bcf9',
        accent: '#576490',
        error: '#b71c1c'
      }
    }
  }
})
