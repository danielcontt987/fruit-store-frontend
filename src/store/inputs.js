import axios from "axios"

const state = {
    areas: [],
    area: { id: 0, name: "Seleccione un área" },
    status: 0,
}

const types = {
    SET_AREA: "SET_AREA",
    SET_AREAS: "SET_AREAS",
    SET_LOADING: "SET_LOADING",
    SET_STATUS: "SET_STATUS"
}

const mutations = {
    [types.SET_AREAS](state, areas) {
        state.areas = areas
    },
    [types.SET_LOADING](state, payload) {
        state.loading = payload;
    },
    [types.SET_STATUS](state, status) {
        state.status = status;
    },
    [types.SET_AREA](state, payload){
        state.area = payload;
    },
}

const actions = {
    listArea({ commit }, payload) {
        commit(types.SET_LOADING, true);
        axios
          .get(`${payload.server}/areas/list`, {
            params: {
              user_id: payload.user_id,
              business_id: payload.business_id
            },
            headers: {
              Authorization: `Bearer ${payload.token}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data"
            }
          })
          .then((res) => {
            const newArea = [{ id: 0, name: "Seleccione un área" }, ...res.data.areas];
            commit(types.SET_AREAS, newArea); // Usar una mutación para actualizar state.areas
            commit(types.SET_STATUS, res.data.status);
            commit(types.SET_LOADING, false);
          })
          .catch((error) => {
            // Manejar errores aquí si es necesario
            commit(types.SET_LOADING, false);
            console.error("Error:", error);
          });
      },
      
    setArea({ commit }, payload) {        
        commit(types.SET_AREA, payload);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}