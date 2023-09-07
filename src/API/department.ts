import {IDataType, jjRequest} from "@/service";

/**
 *  部门列表
 *  查询所有未禁用的部门列表
 * @return list
 */
export const departmentList = () => {
    return jjRequest.request<IDataType>({
        url: "/department/list",
        method: "get",
    });
};

/**
 *  根据部门Id查询部门名称
 *  根据部门Id查询部门名称
 * @return list
 */
export const departmentName = (depId: number) => {
    return jjRequest.request<IDataType>({
        url: `/department/name/${depId}`,
        method: "get",
    });
};
