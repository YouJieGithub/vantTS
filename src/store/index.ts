import {InjectionKey} from "vue";
import {createStore, Store, useStore as baseUseStore} from "vuex";


import RootStateTypes, {AllStateTypes} from "@/store/interface";
import userInfoModule from "@/store/modules/userinfo/index";

export default createStore<RootStateTypes>({
    modules: {
        userInfoModule,
    },
});
export const key: InjectionKey<Store<RootStateTypes>> = Symbol("vue-store");

export function useStore<T = AllStateTypes>() {
    return baseUseStore<T>(key);
}
