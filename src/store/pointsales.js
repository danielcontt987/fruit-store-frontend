import axios from "axios";

const state = {
    products: [],
    sales: [],
    product: null,
};

const types = {
    SET_PRODUCTS: "SET_PRODUCTS",
    SET_PRODUCT: "SET_PRODUCT",
    ADD_TO_SALE_PURCHASE: "ADD_TO_SALE_PURCHASE",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    CLEAR_SALE: "CLEAR_SALE"
};

const mutations = {
    [types.SET_PRODUCTS](state, data) {
        state.products = data
    },
    [types.SET_PRODUCT](state, payload) {
        state.product = payload
    },
    [types.ADD_TO_SALE_PURCHASE](state, payload) {
        state.sales = [...state.sales, payload];
    },
    [types.DELETE_PRODUCT](state, payload) {
        state.sales = state.sales.filter(item => item !== payload);
    },
    [types.CLEAR_SALE](state) {
        state.sales = [];
    },
}

const actions = {
    listProducts({commit}, params){
        axios.get(params.server + "/product/list", {
            headers: {
                Authorization: `${"Bearer"}${" "}${params.token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            commit(types.SET_PRODUCTS, res.data.products);
        }).catch((error) => {
            console.error(error);
        });
    },
    addToSalePurchase({ commit }, payload) {
        commit(types.ADD_TO_SALE_PURCHASE, payload);
    },
    deleteToSale({ commit }, payload) {
        commit(types.DELETE_PRODUCT, payload);
    },
    setProduct({commit}, payload){
        commit(types.SET_PRODUCT, payload);
    },
    clearSale({commit}){
        commit(types.CLEAR_SALE);
    }
};


export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
