import {IDataType, jjRequest} from "../service";

export const successApi = () => {
  return jjRequest.request<IDataType>({
    url: "task/list",
    method: "get",
  });
};
