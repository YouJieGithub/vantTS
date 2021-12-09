import {Notify} from "vant";

export class EmptyReg {
  public static isUndefined(res: string) {
    if (res === null) {
      return true;
    } else {
      return false;
    }
  }

  public static isNull(res: string) {
    if (res === undefined) {
      return true;
    } else {
      return false;
    }
  }

  public static isEmpty(str: string, name: string) {
    if (this.isUndefined(str)) {
      return true;
    }
    if (this.isNull(str)) {
      return true;
    }
    if (str.trim().length === 0) {
      Notify({ type: "danger", message: `${name}不能为空` });
      return true;
    }
    return false;
  }
}
