import axios from "axios";


const state = {
    msg: "Hola 123",
    token: null,
    status: 0,
    userId: 0,
    user: null,
    server: "http://localhost:8000",
};

const types = {
    SET_LIST_DATA: "SET_LIST_DATA",
    SET_TOKEN: "SET_TOKEN",
    SET_USER_ID: "SET_USER_ID",
    SET_STATUS: "SET_STATUS",
    SET_USER: "SET_USER"
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
    [types.SET_USER_ID](state, user) {
        state.userId = user;
    },
    [types.SET_USER](state, user ){
        state.user = user
    }
};

const actions = {
    list({commit}){
        axios.get("http://localhost:8000/user/list")
        .then((res) => {
            commit(types.SET_LIST_DATA, res.data);
        })
    },
    loginUser({commit,state}, payload){
        return new Promise((resolve, reject) =>{
            axios.post(state.server+'/login', payload)
             .then((res) =>{
                commit(types.SET_TOKEN, res.data.token)
                commit(types.SET_USER_ID, res.data.user.id)
                commit(types.SET_STATUS, res.data.status)
                commit(types.SET_USER, res.data.user)
                resolve(res)
                state.token = localStorage.setItem('token', token);
                state.userId = localStorage.setItem('user', userId);
                state.user = localStorage.setItem('user', user);
            }).catch((err) =>{
                reject(err);
            })
        })
    },

    saveToken({ commit }, token) {
        commit(types.SET_TOKEN, token);
    },

    saveUserId({ commit }, userId) {
        commit(types.SET_USER_ID, userId);
    },

    saveUser({ commit }, user) {
        commit(types.SET_USER, user);
    },

}


export default{
    namespaced: true,
    state,
    actions,
    mutations,
    types
}