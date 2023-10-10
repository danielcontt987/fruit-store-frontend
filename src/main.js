/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import store from './store'
import moment from 'moment'
import { currency } from './filters/index';

const app = createApp(App).use(store)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$moment = moment;
// Registra la propiedad 'currency' en la instancia de Vue
app.config.globalProperties.$currency = currency;

registerPlugins(app, axios);


app.mount('#app')
