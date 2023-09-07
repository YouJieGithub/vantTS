import {IDataType, jjRequest} from "@/service";

/**
 *  echarts部门树列表
 *  根据当前登录用户查询部门树列表
 * @return list<object>
 */
export const depList = () => {
    return jjRequest.request<IDataType>({
        url: "/statistic/list/authority",
        method: "get"
    });
};

/**
 *  入职来源统计
 *  根据部门Id统计在职员工的入职来源类型
 * @return list
 * @param data
 * {
 * departmentId   部门Id
 * month          月份
 * queryType      查询类型(0：按周查询，1：按月查询)
 * weekDay        周查询起始时间}
 */
export const countInfo = (data: object) => {
    return jjRequest.request<IDataType>({
        url: "/statistic/count/inform",
        method: "post",
        data: data,
    });
};

/**
 *  年龄统计
 *  根据部门Id对员工的年龄进行统计
 * @return list<object>
 * @param data
 */
export const countAge = (data: number | null) => {
    return jjRequest.request<IDataType>({
        url: "/statistic/count/age",
        method: "get",
        params: {
            departmentId: data
        }
    });
};

/**
 *  工龄统计
 *  根据部门Id对员工的工龄进行统计
 * @return list
 * @param data
 */
export const countSeniority = (data: number | null) => {
    return jjRequest.request<IDataType>({
        url: "/statistic/count/seniority",
        method: "get",
        params: {
            departmentId: data
        }
    });
};

/**
 *  入离职人员数据
 *  根据部门Id对员工的入离职人员数据统计
 *  @param queryType
 *  @param departmentId   部门Id
 * @return list
 */
export const countDivergence = (queryType: number, departmentId: number | null) => {
    return jjRequest.request<IDataType>({
        url: `/statistic/count/divergence/${queryType}`,
        method: "get",
        params: {
            departmentId: departmentId
        }
    });
};

/**
 *  人员类型以及状态统计
 *  根据部门Id对对不同状态员工以及工种进行数据统计
 *  @param departmentId   部门Id
 * @return list
 */
export const statisticNums = (departmentId: number | null) => {
    return jjRequest.request<IDataType>({
        url: '/statistic/nums',
        method: "get",
        params: {
            departmentId: departmentId
        }
    });
};