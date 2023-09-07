import {showNotify} from "vant";

export class EmptyReg {
    public static isUndefined(res: string) {
        return res === null;
    }

    public static isNull(res: string) {
        return res === undefined;
    }

    public static isEmpty(str: string, name: string) {
        if (this.isUndefined(str)) {
            return true;
        }
        if (this.isNull(str)) {
            return true;
        }
        if (str.trim().length === 0) {
            showNotify({type: "danger", background: '#999999', message: `${name}不能为空`});
            return true;
        }
        return false;
    }
}
