import axios from "axios";


const state = {
    msg: "Hola 123",
    token: null,
    status: 0,
};

const types = {
    SET_LIST_DATA: "SET_LIST_DATA",
    SET_TOKEN: "SET_TOKEN",
    SET_STATUS: "SET_STATUS",
}

const mutations = {
    [types.SET_LIST_DATA](state, data) {
        state.articles = data;
    },
    [types.SET_TOKEN](state, data) {
        state.token = data;
    },
    [types.SET_STATUS](state, status) {
        state.status = status;
    },
}

const actions = {
    list({commit}){
        axios.get("http://localhost:8080/user/list")
        .then((res) => {
            commit(types.SET_LIST_DATA, res.data);
        })
    },
    loginUser({commit,state}, payload){
        return new Promise((resolve, reject) =>{
            axios.post('http://localhost:8080/login', payload)
             .then((res) =>{
                commit(types.SET_TOKEN, res.data.token)
                commit(types.SET_STATUS, res.data.status)
                resolve(res)
                state.token = localStorage.setItem('token', token);
            }).catch((err) =>{
                reject(err);
            })
        })
    },

    saveToken({ commit }, token) {
        commit(types.SET_TOKEN, token);
    }
}


export default{
    namespaced: true,
    state,
    actions,
    mutations,
    types
}