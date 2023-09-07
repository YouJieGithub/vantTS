import {IDataType, jjRequest} from "@/service";

/**
 * 首页通知查询
 * 描述：查询首页通知
 * @return 详情
 */
export const noticeHomeList = () => {
    return jjRequest.request<IDataType>({
        url: 'notice/homeList',
        method: "get",
    });
};


/**
 * 必读通知
 * 描述：查询当前登录员工是否存在必读通知
 * 描述：查询当前登录员工是否存在必读通知
 * @return 详情
 */
export const noticeShowList = () => {
    return jjRequest.request<IDataType>({
        url: 'notice/showList',
        method: "get",
    });
};

/**
 * 通知列表
 * 描述：系统通知列表
 * @param  limit 每页数量
 * @param  page  页码
 * @param  title 搜索标题
 * @param  queryType 查询类型(0:全部，1：未读)
 * @return list
 */
export const noticeList = (page: number, limit: number, queryType: number, title: string) => {
    return jjRequest.request<IDataType>({
        url: `/notice/list/${page}/${limit}/${queryType}`,
        method: "get",
        params: {
            title: title
        }
    });
};

/**
 * 通知详情
 * 描述：根据通知id查询通知详情
 * @return 详情
 * @param detail
 */
export const noticeDetail = (detail: number) => {
    return jjRequest.request<IDataType>({
        url: `/notice/detail/${detail}`,
        method: "get",
    });
};

/**
 * 修改读取状态
 * 描述：员工进入通知详情页面后修改该通知的读取状态
 * @return 结果
 * @param detail
 */
export const noticeUpdateStatus = (detail: number) => {
    return jjRequest.request<IDataType>({
        url: `/notice/update/status/${detail}`,
        method: "get",
    });
};