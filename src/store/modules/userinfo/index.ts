import {Module} from "vuex";

import RootStateTypes from "@/store/interface";
import userStateTypes from "@/store/modules/userinfo/interface";

const userInfoModule: Module<userStateTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        staffFlag: null,
        username: "",
        telephone: "",
        integral:false
    },
    mutations: {
        setState(state, data) {
            state.staffFlag = data.staffFlag;
            state.username = data.username;
            state.telephone = data.telephone;
            state.integral=data.integral;
        },
    },
    actions: {},
    modules: {},
};

export default userInfoModule;
