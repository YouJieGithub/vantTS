<template>
  <HeadBack :title="route.meta.title"/>
  <div class="amount">
    <div class="amount-card">
      <div class="amount-card-tile">
        <fontSvg :icon="'#icon-a-dianxiaoer-tubiao_huaban1fuben96'"/>
        支付金额
      </div>
      <div class="amount-card-num"><span>￥</span>200</div>
    </div>
  </div>
  <div class="payment">
    <div>支付方式</div>
    <div>
      <fontSvg :icon="'#icon-weixinzhifu'"/>
      <span>微信支付</span></div>
  </div>
  <div class="feedback_submit">
    <Button class="bigButton" type="primary" @click="pay">确 认 支 付</Button>
  </div>
</template>

<script lang="ts" setup>
import fontSvg from '@/components/fontSvg.vue';
import HeadBack from "@/components/header.vue";
import {Button} from "vant";
import {recordSave} from "@/API/pay";
import WechatPay from "@/utils/wechatPay";
import {useRoute} from "vue-router";

const route=useRoute();

const pay = () => {
  recordSave({money: 200}).then((res: any) => {
    onBridgeReady(res);
  })
}

//调用支付
const onBridgeReady = (res: any) => {
  console.log(res)
  const wechatpay = new WechatPay();
  const payParams: any = {
    appId: res.data.appId,
    timeStamp: res.data.timeStamp,
    nonceStr: res.data.nonceStr,
    package: res.data.package,
    signType: res.data.signType,
    sign: res.data.paySign
  };
  wechatpay.res = Object.assign({}, payParams);
  //下面wechatpay.WeChartJSBridge里面是一个成功支付的回调，在里面你可以做回调成功的操作
  wechatpay.WeChartJSBridge(() => {
    console.log(1)
  });
}

</script>

<style lang="scss" scoped>

@import "@/assets/css/public.scss";

$marginPage: 0 24px;
.amount {
  margin: $marginPage;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 260px;
  background-color: #ffffff;
  border-radius: 12px;
  font-size: 24px;
  color: #333333;

  .amount-card-num {
    font-size: 73px;

    span {
      font-size: 36px;
    }
  }
}

.payment {
  margin: $marginPage;
  margin-top: 20px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 106px;
  background-color: #ffffff;
  border-radius: 12px;
  font-size: 28px;
  color: #333333;
}

</style>