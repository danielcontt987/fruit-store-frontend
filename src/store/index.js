import { createStore } from 'vuex'
import login from './login';
import alerts from './alerts';
import menu from './menu';
import clients from './clients';


export default createStore({
  modules: {
    login,
    alerts,
    menu,
    clients
  }
})
