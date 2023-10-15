import axios from "axios";

const state = {
    status: 0,
    loading: false,
    saleboxes: [],
};

const types = {
    SET_LOADING: "SET_LOADING",
    SET_STATUS: "SET_STATUS",
    SET_SALEBOXES: "SET_SALEBOXES",
};

const mutations = {
    [types.SET_LOADING](state, payload) {
        state.loading = payload;
    },
    [types.SET_STATUS](state, status) {
        state.status = status;
    },
    [types.SET_STATUS](state, status) {
        state.status = status;
    },
    [types.SET_SALEBOXES](state, saleboxes) {
        state.saleboxes = saleboxes;
    },
};

const actions = {
    createSalebox({commit}, payload){
        commit(types.SET_LOADING, false);
        return new Promise ((resolve, reject) =>{
            axios.post(payload.server + "/salebox/store", {
                user_id: payload.user_id,
                name: payload.salebox
            }, {
                headers: {
                    Authorization: `${"Bearer"}${" "}${payload.token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                commit(types.SET_STATUS, res.data.status);
                commit(types.SET_LOADING, false);
                resolve(res)
            }).catch((error) => {
                reject(error)
            });
        })
    },
    listSalebox({commit}, payload){
        commit(types.SET_LOADING, true);
            axios.get(payload.server + "/salebox/list", {
                params:{
                    user_id: payload.user_id,
                },
                headers: {
                    Authorization: `${"Bearer"}${" "}${payload.token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                commit(types.SET_SALEBOXES, res.data.saleboxes);
                commit(types.SET_LOADING, false);
            }).catch((error) => {
                console.error(error);
            });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

