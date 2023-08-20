import { createStore } from 'vuex'
import login from './login';
import alerts from './alerts';
import menu from './menu';


export default createStore({
  modules: {
    login,
    alerts,
    menu,
  }
})
