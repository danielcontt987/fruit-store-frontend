const types = {
    SET_SHOW: "SET_SHOW",
    SET_SHOW_BUTTON: "SET_SHOW_BUTTON",
    SET_SHOW_PROGRESS: "SET_SHOW_PROGRESS",
    SET_PARAMS: "SET_PARAMS"
};


const state = {
    showDialog: false,
    showDialogButton: false,
    showDialogProgress: false,
    icon:   '',
    title:  '',
    msg:    '',
    color:  '',
    textOk: '',
    type:   0,
};

const actions = {
    setDialog({ commit }, params) {
        commit(types.SET_SHOW, true);
        commit(types.SET_PARAMS, params);
    },
    closeDialog({ commit }) {
        commit(types.SET_SHOW, false);
    },
    setDialogButtons({ commit }, params) {
        commit(types.SET_SHOW_BUTTON, true);
        commit(types.SET_PARAMS, params);
    },
    closeDialogButtons({ commit }) {
        commit(types.SET_SHOW_BUTTON, false);
    },
    setProgress({ commit }, params) {
        commit(types.SET_SHOW_PROGRESS, true);
        commit(types.SET_PARAMS, params);
    },
    closeDialogProgress({ commit }) {
        commit(types.SET_SHOW_PROGRESS, false);
    },
}

const mutations = {
    [types.SET_SHOW](state, show) {
        state.showDialog = show;
    },
    [types.SET_SHOW_BUTTON](state, show) {
        state.showDialogButton = show;
    },
    [types.SET_SHOW_PROGRESS](state, show) {
        state.showDialogProgress = show;
    },
    [types.SET_PARAMS](state, params) {
        state.color     = params.color;
        state.icon      = params.icon;
        state.msg       = params.msg;
        state.title     = params.title;
        state.textOk    = params.textOk;
        state.type      = params.type;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
