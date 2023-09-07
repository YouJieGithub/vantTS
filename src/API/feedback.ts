import {IDataType, jjRequest} from "@/service";

/**
 * 新增建议反馈
 * 新增建议反馈
 * @param data 反馈内容与类型
 * @return list
 */
export const proposalSave = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/proposal/save",
        method: "post",
        data: data,
    });
};

/**
 * 反馈列表
 * 查询当前登录员工的反馈记录列表
 * @return list   每页大小
 * @param page    页码
 * @param limit
 */
export const proposalList = (page: number, limit: number) => {
    return jjRequest.request<IDataType>({
        url: `/proposal/list/${page}/${limit}`,
        method: "get"
    });
};