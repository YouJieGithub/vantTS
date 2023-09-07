import userStateTypes from "@/store/modules/userinfo/interface";

export default interface RootStateTypes {
}

export interface AllStateTypes extends RootStateTypes {
    userInfoModule: userStateTypes;
}
