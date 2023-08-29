import axios from "axios";


const state = {
    server: "http://localhost:8080",
    loading: false,
    clients: [],
};

const types = {
    SET_LOADING: "SET_LOADING",
    SET_CLIENTS: "SET_CLIENTS",
}

const mutations = {
  [types.SET_LOADING](state, loading){
    state.loading = loading
  },

  [types.SET_CLIENTS](state, clients){
    state.clients = clients
  },

}

const actions = {
   createClient({commit}, payload){
    let formData = new FormData();
    formData.append("name", payload.name);
    formData.append("phone", payload.phone);
    formData.append("status", payload.status);
    formData.append("user_id", payload.user_id);
    formData.append("email", payload.email);
    return new Promise((resolve) => {
      axios
        .post(state.server + "/client/store", formData, {
          headers: {
            Authorization: `${"Bearer"}${" "}${payload.token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          commit(types.SET_LOADING, false);
          resolve(data);
        });
    });
   },
   listClient({commit}, payload, token){
      axios
        .post(state.server + "/client/list",payload, {
            headers: {
              Authorization: `${"Bearer"}${" "}${token}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {   
            commit(types.SET_CLIENTS, res.data.clients);
        })
        .catch((error) => {
            console.error(error);
        });
   }

}


export default{
    namespaced: true,
    state,
    actions,
    mutations,
    types
}