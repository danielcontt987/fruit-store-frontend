const state = {
    drawer: false,
    rail: false,
};

const mutations = {
    SET_DRAWER(state, value) {
       state.drawer = value;
     },
     SET_RAIL(state, value) {
       state.rail = value;
     },
}

const actions = {
    toggleDrawer({ commit, state }) {
       commit('SET_DRAWER', !state.drawer);
     },
     toggleRail({ commit, state }) {
       commit('SET_RAIL', !state.rail);
     },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
  