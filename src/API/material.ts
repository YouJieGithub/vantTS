import {IDataType, jjRequest} from "@/service";

/**
 * 物料管理
 * 描述：查询当前登录用户购买物料的销售列表
 * @return 详情
 */
export const materialList = () => {
    return jjRequest.request<IDataType>({
        url: 'material/list',
        method: "get",
    });
};