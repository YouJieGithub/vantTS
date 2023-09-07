import {IDataType, jjRequest} from "@/service";

/**
 *  查询开户行信息
 *  根据当前银行卡号查询开户行
 * @return list
 */
export const bankInfo = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/system/bankInfo",
        method: "post",
        data: data,
    });
};

/**
 *  查询当前员工银行卡信息
 *  查询当前员工银行卡信息
 * @return 详情
 */
export const bankBandQuery = () => {
    return jjRequest.request<IDataType>({
        url: "/staff/bank/query",
        method: "get"
    });
};

/**
 *  添加银行卡
 *  店小二移动端用户添加银行卡
 * @return 详情
 */
export const bandSave = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/staff/bank/save",
        method: "post",
        data: data
    });
};
