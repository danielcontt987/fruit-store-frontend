import { createStore } from 'vuex'
import login from './login';
import alerts from './alerts';
import menu from './menu';
import clients from './clients';
import pointsales from './pointsales';
import inputs from './inputs';
import globals from './globals';



export default createStore({
  modules: {
    login,
    alerts,
    menu,
    clients,
    pointsales,
    inputs,
    globals
  }
})
