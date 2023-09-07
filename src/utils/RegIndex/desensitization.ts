export class Desensitization {
    //银行卡号脱敏处理  4位一空格
    static cardProcess(val: string) {
        return val.replace(/....(?!$)/g, "**** ");
    }

    //手机号脱敏处理
    static telephoneProcess(val: string) {
        return val.replace(/^(.{3}).*(.{4})$/, "$1****$2");
    }

    //身份证号脱敏处理
    static IDcardProcess(val: string) {
        return val.replace(/^(.{3}).*(.{2})$/, "$1****$2");
    }
}
