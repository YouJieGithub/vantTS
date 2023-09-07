import {showNotify} from "vant";
import {EmptyReg} from "./isEmpty";

export class PhoneReg {
    public static isPhone(phone: string) {
        let name = "手机号";
        if (EmptyReg.isEmpty(phone, name)) {
            return false;
        }
        let reg =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; //手机号正则
        // /^(1[357])\d{9}$/; //手机号正则
        if (reg.test(phone)) {
            return true; //手机号码正确
        } else {
            showNotify({type: "danger", background: '#999999', message: `${name}格式不正确`});
            return false;
        }
    }
}
