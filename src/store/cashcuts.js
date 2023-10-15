import axios from "axios";

const state = {
    state: 0,
    loading: false,
    cashcut: null,
    cut: null,
};

const types = {
    SET_STATUS: "SET_STATUS",
    SET_LOADING: "SET_LOADING",
    SET_CASH_CUT: "SET_CASH_CUT",
    SET_CUT: "SET_CUT"
};

const mutations = {
    [types.SET_LOADING](state, payload) {
        state.loading = payload;
    },
    [types.SET_STATUS](state, status) {
        state.status = status;
    },
    [types.SET_CASH_CUT](state, cashcut) {
        state.cashcut = cashcut;
    },
    [types.SET_CUT](state, cut) {
        state.cut = cut;
    },
};

const actions = {
    createCashCut({commit}, payload){
        commit(types.SET_LOADING, true);
        return new Promise ((resolve, reject) =>{
            axios.post(payload.server + "/cashcut/store", {
                amount: payload.amount,
                salebox_id: payload.salebox_id,
                user_id: payload.user_id,
                business_id: payload.business_id,
            }, {
                headers: {
                    Authorization: `${"Bearer"}${" "}${payload.token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                commit(types.SET_CASH_CUT, res.data.cashcut);
                commit(types.SET_LOADING, false);
                resolve(res)
            }).catch((error) => {
                reject(error)
            });
        })
    },
    getCashCut({commit}, payload){
        commit(types.SET_LOADING, true);
        return new Promise ((resolve, reject)=>{
            axios.get(payload.server + "/cashcut/get", {
                params:{
                    user_id: payload.user_id,
                    business_id: payload.business_id,
                },
                headers: {
                    Authorization: `${"Bearer"}${" "}${payload.token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                commit(types.SET_CASH_CUT, res.data.cashcut);
                commit(types.SET_LOADING, false);
                resolve(res);
            }).catch((error) => {
                reject(error);
                console.error(error);
            });
        })
        
    },
    setCashCut({commit}, cut){
        commit(types.SET_CUT, cut);
    }
};



export default {
    namespaced: true,
    state,
    actions,
    mutations
}

