// wechatPay.ts文件
import {showToast} from 'vant'

declare let WeixinJSBridge: any  // 解决 WeixinJSBridge 在TS编译会报错
export interface Res { // 微信需要传入的数据，数据格式定义
    appId?: string;
    timeStamp?: string;
    nonceStr?: string;
    package?: string;
    signType?: string;
    sign?: string;
}

export default class WechatPay {
    public payType = ''
    public res: Res = {}  // 数据由后端返回
    /**
     * 微信JS支付，在点击支付时启用
     */
    public WeChartJSBridge(callback: any): void {
        if (typeof WeixinJSBridge === 'undefined') { // WeixinJSBridge 在TS编译会报错，因为该对象只在微信浏览器中存在，在文件头部声明 declare let WeixinJSBridge: any 即可
            if (document.addEventListener) {
                // 监听调用，可有可无
                document.addEventListener('WeixinJSBridgeReady', () => {
                    this.onBridgeReady(this.res, callback)
                }, false)
            } else if ((document as any).attachEvent) { // attachEvent()只在IE中有用，IE11已经不再支持
                (document as any).attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                (document as any).attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridgeReady(this.res, callback)
        }
    }

    public onBridgeReady(res: Res, callback: Function): void {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
                appId: res.appId,
                // 公众号名称，由商户传入
                timeStamp: res.timeStamp,
                // 时间戳，自1970年以来的秒数
                nonceStr: res.nonceStr,
                // 随机串
                package: res.package,
                signType: res.signType,
                // 微信签名方式：
                paySign: res.sign
                // 微信签名
            },
            (res: any) => {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    callback()
                }
                if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                    // 支付取消
                    showToast('支付取消')
                }

                if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    // 支付失败
                    showToast('支付失败')
                }
            })
    }
}