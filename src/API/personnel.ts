import {IDataType, jjRequest} from "@/service";

/**
 * 人员列表
 * 描述：查询各个状态下的员工详情[总账号权限]
 * @return list
 * @param page      页码
 * @param limit      每页大小
 * @param params
 */
export const staffList = (page: number, limit: number, params: object) => {
    return jjRequest.request<IDataType>({
        url: `/staff/list/${page}/${limit}`,
        method: "get",
        params: params
    });
};
