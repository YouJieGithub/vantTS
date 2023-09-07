import {IDataType, jjRequest} from "@/service";

/**
 *  基础信息
 *  查询当前员工的基础信息
 * @return list<object>
 */
export const baseDetail = () => {
    return jjRequest.request<IDataType>({
        url: "/staff/base/detail",
        method: "get"
    });
};

/**
 *  修改基础信息
 *  修改当前员工的基础信息
 * @return 结果
 */
export const baseUpdate = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/staff/base/update",
        method: "post",
        data: data
    });
};

