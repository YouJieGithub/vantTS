import {IDataType, jjRequest} from "@/service";

/**
 * 用户注册
 * 店小二移动端用户注册
 * @param data
 * @return 结果
 */
export const register = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/system/register",
        method: "post",
        data: data,
    })
};

/**
 * 发送验证码
 * 根据当前银行卡号查询开户行
 * @param data
 * @return 结果
 */
export const smsCode = (data: any) => {
    return jjRequest.request<IDataType>({
        url: '/system/code',
        method: "get",
        params: data
    });
};

/**
 * 员工登录(密码登录)
 * 店小二移动端用户登录
 * @param data
 * @return jwt
 */
export const login = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/system/login/psw",
        method: "post",
        data: data,
    });
};

/**
 * 员工登录(自动登录)
 * 店小二移动端用户登录
 * @return jwt
 * @param code
 */
export const autoLogin = (code: string | number) => {
    return jjRequest.request<IDataType>({
        url: "/system/login/code",
        method: "get",
        params: {
            code: code
        }
    });
};

/**
 * 登出
 * @return 成功与否
 */
export const systemlogout = () => {
    return jjRequest.request<IDataType>({
        url: '/staff/logout',
        method: "post",
    });
};

/**
 * 修改密码
 * 用户修改登录密码
 * @param data
 * @return jwt
 */
export const updatePsw = (data: any) => {
    return jjRequest.request<IDataType>({
        url: "/staff/update/psw",
        method: "post",
        data: data,
    });
};

/**
 * 离职申请记录列表
 * 查询员工的离职申请记录列表
 * @return list
 */
export const resignList = () => {
    return jjRequest.request<IDataType>({
        url: '/resign/list',
        method: "get"
    });
};

/**
 * 新增离职记录
 * @return list
 */
export const resignSave = (reasonId: number) => {
    return jjRequest.request<IDataType>({
        url: `/resign/save/${reasonId}`,
        method: "get"
    });
};

/**
 * 离职原因列表
 * 查询所有离职原因列表
 * @return list
 */
export const systemInform = () => {
    return jjRequest.request<IDataType>({
        url: '/system/inform',
        method: "get",
        params: {
            code: 'reason'
        }
    });
};

/**
 * 获取当前登录员工状态
 * 获取当前登录员工在职状态
 * @return list
 */
export const staffStatus = () => {
    return jjRequest.request<IDataType>({
        url: '/staff/status',
        method: "get"
    });
};

/**
 * 取消离职申请
 * 根据离职申请id取消当前离职申请
 * @return list
 */
export const resignCancel = (resignId: number) => {
    return jjRequest.request<IDataType>({
        url: `/resign/cancel/${resignId}`,
        method: "get"
    });
};