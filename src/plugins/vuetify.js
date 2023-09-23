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
          primary: '#001f4a',
          primary_dark: '#051942',
          fail: '#F50057',
          secondary: '#00337C',
          secondary_dark: '#001f4a',
          background: '#E2E2E2',
          white: '#FFFFFF',
          grey: "#A2A2A2",
          black: '#000000',
          drawerColor: "#1744a5",
          success: '#27AE60',
          accent: "#00CFB5",
          error: "#C22F2F",
          success_card: '#27AE60',
        },
      },
    },
  },
})
