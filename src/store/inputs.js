import axios from "axios"

const state = {
    areas: [],
    stocks: [],
    clients: [],
    area: { id: 0, name: "Seleccione un área" },
    stock: { id: 0, name: "Seleccione un almacén" },
    client: { id: 0, name: "Cliente general" },
    status: 0,
}

const types = {
    SET_AREA: "SET_AREA",
    SET_AREAS: "SET_AREAS",
    SET_LOADING: "SET_LOADING",
    SET_STATUS: "SET_STATUS",
    SET_STOCKS: "SET_STOCKS",
    SET_STOCK: "SET_STOCK",
    SET_CLIENT: "SET_CLIENT",
    SET_CLIENTS: "SET_CLIENTS"

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
    [types.SET_STOCKS](state, stocks) {
      state.stocks = stocks
    },
    [types.SET_STOCK](state, payload){
      state.stock = payload;
    },
    [types.SET_CLIENT](state, payload){
      state.client = payload;
    },
    [types.SET_CLIENTS](state, clients){
      state.clients = clients;
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
    listStock({ commit }, payload) {
      commit(types.SET_LOADING, true);
      axios
        .get(`${payload.server}/inventory/list`, {
          params: {
            area_id: payload.area_id,
          },
          headers: {
            Authorization: `Bearer ${payload.token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {
          const newInventory = [{ id: 0, name: "Seleccione un almacén" }, ...res.data.inventories];
          commit(types.SET_STOCKS, newInventory); // Usar una mutación para actualizar state.inventory
          commit(types.SET_STATUS, res.data.status);
          commit(types.SET_LOADING, false);
        })
        .catch((error) => {
          // Manejar errores aquí si es necesario
          commit(types.SET_LOADING, false);
          console.error("Error:", error);
        });
    },
    listClient({ commit }, payload) {
      commit(types.SET_LOADING, true);
      axios
        .get(`${payload.server}/client/list`, {
          params: {
            user_id: payload.user_id,
            business_id: payload.business_id,
          },
          headers: {
            Authorization: `Bearer ${payload.token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {
          const newClient = [{ id: 0, name: "Cliente general" }, ...res.data.clients];
          commit(types.SET_CLIENTS, newClient); // Usar una mutación para actualizar state.clients
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
    setStock({ commit }, payload) {        
      commit(types.SET_STOCK, payload);
    },
    setClient({ commit }, payload) {        
      commit(types.SET_CLIENT, payload);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}