import {EmptyReg} from "./isEmpty";
import {showNotify} from "vant";

export class IDcardReg {
    public static IdentityCodeValid(code: any) {
        code = code.toLocaleUpperCase();
        const city: Array<number> = [
            11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43,
            44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91,
        ];
        // let tip: string = "";
        let pass: boolean = true;
        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            // tip = "身份证号格式错误";
            pass = false;
        } else if (city.includes(code.substring(0, 2))) {
            // tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位if(code.length == 18){
            code = code.split("");
            //∑(ai×Wi)(mod 11)//加权因子
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17]) {
                // tip = "校验位错误";
                pass = false;
            }
        }
        return pass;
    }

    public static isIDCard(card: string) {
        let name = "身份证号";
        if (EmptyReg.isEmpty(card, name)) {
            return false;
        }

        if (this.IdentityCodeValid(card)) {
            return true; //身份证号正确
        } else {
            showNotify({type: "danger", background: '#999999', message: `${name}格式不正确`});
        }
        return false;
    }
}
