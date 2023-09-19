import {IDataType, jjRequest} from "@/service";

/**
 * 充值
 * @data { "money":"200"        //充值金额 }
 * @return list<object>
 */

export const recordSave = (data: Object) => {
    return jjRequest.request<IDataType>({
        url: "/recharge/record/save",
        data: data,
        method: "post"
    });
};

/**
 * 获取退款回显数据
 * @return list<object>
 */

export const recordDetail = (data: number | string) => {
    return jjRequest.request<IDataType>({
        url: `/recharge/record/detail/${data}`,
        method: "get"
    });
};


/**
 * 申请记录
 * @return list<object>
 */

export const refundApplyList = () => {
    return jjRequest.request<IDataType>({
        url: "/recharge/refund/apply/list",
        method: "post"
    });
};

/**
 * 申请详情
 * @return list<object>
 */

export const recordApply = (data: number | string | string[]) => {
    return jjRequest.request<IDataType>({
        url: `/recharge/refund/apply/${data}`,
        method: "get"
    });
};


/**
 * 获取OSS临时密钥
 * @return list<object>
 */

export const recordGetSTS = () => {
    return jjRequest.request<IDataType>({
        url: '/recharge/getsts',
        method: "get"
    });
};

/**
 * 申请退款
 * @data { "rechargeRecordId": 2,
 *     "urls": [
 *         "https//1.jpg",
 *         "https//1xxx.jpg"
 *     ] }
 * @return list<object>
 */

export const refundSave = (data: Object) => {
    return jjRequest.request<IDataType>({
        url: "/recharge/refund/save",
        data: data,
        method: "post"
    });
};

/**
 * 支付页面数据
 * @return list<object>
 */

export const rechargeList = () => {
    return jjRequest.request<IDataType>({
        url: '/recharge/recharge/list',
        method: "get"
    });
};