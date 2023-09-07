import {IDataType, jjRequest} from "@/service";

/**
 *  查询用户信息
 *  查询当前登录公众号用户的基本信息
 * @return list
 */
export const personBase = () => {
    return jjRequest.request<IDataType>({
        url: '/accident/person/base',
        method: "get"
    });
};


/**
 * 新增案件
 * 新增案件基本信息
 * @param data 新增案件信息
 * @return list
 */
export const accidentSave = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/accident/save",
        method: "post",
        data: data,
    });
};


/**
 *  案件列表
 *  新增案件基本信息
 * @return list
 */
export const accidentList = () => {
    return jjRequest.request<IDataType>({
        url: '/accident/list',
        method: "get"
    });
};


/**
 *  案件详情
 *   根据案件id查询对应的案件详情信息
 * @return list
 */
export const accidentDetail = (dataID: any) => {
    return jjRequest.request<IDataType>({
        url: `/accident/detail/${dataID}`,
        method: "get"
    });
};


