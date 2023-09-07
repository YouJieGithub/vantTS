import {IDataType, jjRequest} from "@/service";

/**
 *  信息来源列表
 *  查询所有信息来源列表
 * @return list
 */
export const systemInform = (data: any) => {
    return jjRequest.request<IDataType>({
        url: '/system/inform',
        method: "get",
        params: {
            code: data
        }
    });
};
