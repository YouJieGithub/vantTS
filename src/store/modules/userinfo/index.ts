import {Module} from "vuex";

import RootStateTypes from "@/store/interface";
import userStateTypes from "@/store/modules/userinfo/interface";

const userInfoModule: Module<userStateTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        staffFlag: null,
        username: "",
        positionName: ""
    },
    mutations: {
        setState(state, data) {
            state.staffFlag = data.staffFlag;
            state.username = data.username;
            state.positionName = data.positionName;
        },
    },
    actions: {},
    modules: {},
};

export default userInfoModule;
