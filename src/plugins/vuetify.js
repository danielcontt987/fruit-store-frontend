/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#000030',
          fail: '#F50057',
          secondary: '#00337C',
          secondary_dark: '#001F4A',
          background: '#E6E6E6',
          white: '#FFFFFF',
          grey: "#A2A2A2",
          black: '#000000',
          success: '#27AE60'
        },
      },
    },
  },
})
