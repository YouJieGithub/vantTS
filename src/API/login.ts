import {IDataType, jjRequest} from "../service";

export const successApi = (data:any) => {
    return jjRequest.request<IDataType>({
        url: "/questions/getQuestions",
        method: "post",
        data: data
    })
};
