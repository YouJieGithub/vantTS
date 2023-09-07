import {EmptyReg} from "./isEmpty";
import {showNotify} from "vant";

export class BankReg {
    public static isBank(bank: string) {
        const name: string = "银行卡号";
        const bankReg: any = /^(6)(\d{15}|\d{17}|\d{18})$/;
        if (EmptyReg.isEmpty(bank, name)) {
            return false;
        }
        console.log(bankReg.test(bank))
        if (bankReg.test(bank)) {
            return true;
        } else {
            showNotify({type: "danger", background: '#999999', message: `${name}格式不正确`});
        }
    }
}
