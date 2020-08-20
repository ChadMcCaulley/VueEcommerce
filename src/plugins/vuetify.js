import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#9343d9',
        secondary: '#435abf',
        accent: '#7543bf',
        rating: '#fcba03',
        background: '#fef1f9',
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
