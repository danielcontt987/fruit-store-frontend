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
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App).use(store)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$moment = moment;
registerPlugins(app, axios);

app.mount('#app')
