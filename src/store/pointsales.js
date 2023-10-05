import axios from "axios";

const state = {
    products: [],
};

const types = {
    SET_PRODUCTS: "SET_PRODUCTS",
};

const mutations = {
    [types.SET_PRODUCTS](state, data) {
        state.products = data
    }
}

const actions = {
    // listProducts({ commit }, token) {


    'pointsales/listProducts'({ commit }, params) {                
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
};


export default {
    state,
    actions,
    mutations,
}
