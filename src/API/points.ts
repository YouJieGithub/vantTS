import {IDataType, jjRequest} from "@/service";

/**
 * 积分商城列表查询
 * @param data{
 *     "limit": 10,                                                //  每页大小
 *   "page": 1,                                                   //  当前页码
 * }
 * @return list
 */
export const goodsList = (data:Object) => {
    console.log(data)
    return jjRequest.request<IDataType>({
        url: "/integralProducts/list",
        data:data,
        method: "post",
    });
};

/**
 * 用户积分查询
 * @return data
 */
export const Integral = () => {
    return jjRequest.request<IDataType>({
        url: "/staff/integral",
        method: "get",
    });
};


/**
 * 详情查询
 * 描述  商品详情查询
 * id:id            //  商品id
 * @return data
 * @param id
 */
export const productDetail = (id:number) => {
    return jjRequest.request<IDataType>({
        url: `/integralProducts/productDetail/${id}`,
        method: "get",
    });
};


/**
 * 积分明细查询
 * id:id            //  商品id
 * @param data
 *  "limit": 10,                                                     //  每页大小
 *   "page": 1,													   //  当前页码
 *   @return data
 *
 */
export const integralList = (data:object) => {
    return jjRequest.request<IDataType>({
        url: '/integral/list',
        data:data,
        method: "post",
    });
};


/**
 * 我的兑换
 * id:id            //  商品id
 * @param data
 *  "limit": 10,                                                     //  每页大小
 *   "page": 1,													   //  当前页码
 *   @return data
 *
 */
export const integralOrderList = (data:object) => {
    return jjRequest.request<IDataType>({
        url: '/integral/orderList',
        data:data,
        method: "post",
    });
};

/**
 * 收货地址查询
 *   @return data
 *
 */
export const address = () => {
    return jjRequest.request<IDataType>({
        url: '/staff/address',
        method: "get",
    });
};

/**
 * 下单
 * @param data
 * "count":10,																		//数量
 *     "integralProductsId":1,															//商品id
 *     "address":"太原 专区-新疆宜昇【太原】中环站"										   //收货地址
 *   @return data
 *
 */
export const submitOrder = (data:object) => {
    return jjRequest.request<IDataType>({
        url: '/integralProducts/buy',
        data:data,
        method: "post",
    });
};