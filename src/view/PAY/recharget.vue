<template>
  <HeadBack title="PAY"/>
  <div v-if="!!list" class="pay-list">
    <div class="pay-list-card"
         @click.stop="!!list.rechargeRefundId?router.push({name:'PAYdetail',state:{id:list.rechargeRefundId}}):''">
      <Row align="center" class="pay-list-amount" justify="space-between">
        <Col><span>￥</span>{{ list.money }}</Col>
        <Col :class="list.state===1?'pay-list-amount-btn':''"
             @click.stop="list.state===1?router.push({name:'applyRorRefund',state:{id:list.id,amount:list.money,payTime:list.payTime}}):''">
          {{ ['申请退款', '待审批'].filter((r, i) => i + 1 === list.state).toString() }}
        </Col>
      </Row>
      <div class="pay-list-payTime">支付时间：{{ list.payTime }}</div>
    </div>
  </div>
  <div v-else class="list_none-icon">
    <Empty :image="ListNone" description="暂无记录"></Empty>
    <div class="feedback_submit">
      <Button class="bigButton" type="primary" @click="router.push({path:'/payment'})">立 即 支 付</Button>
    </div>
  </div>
  <div class="to_feedback_list">
    <router-link to="/records"><span>申请记录></span></router-link>
  </div>
</template>

<script lang="ts" setup>
import {Button, Col, Empty, Row} from "vant";
import HeadBack from "@/components/header.vue";
import {useRouter} from "vue-router";
import {rechargeList} from "@/API/pay";
import {IDataType} from "@/service";
import {onBeforeMount, ref} from "vue";

const router = useRouter();
const ListNone: any = new URL('../../assets/image/PAYList.png', import.meta.url).href;

/**
 * 获取充值请求列表
 */
const list = ref<any>(null)
const getRechargeList = () => {
  rechargeList().then((res: IDataType) => {
    if (!!res) {
      list.value = res.data.rows;
    }
  })
}

onBeforeMount(() => {
  getRechargeList()
})


</script>

<style lang="scss" scoped>

@import "@/assets/css/public.scss";

.list_none-icon {
  margin-top: 100px;

  :deep(.van-empty__image) {
    width: 198px;
    height: 159px;
  }

  :deep(.van-empty__description) {
    font-size: 30px;
    color: #000000;
  }
}

.to_feedback_list {
  padding: 30px 0;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  background: #f7f7ff;

  span {
    font-size: 24px;
    color: #ee7e2b;
  }
}

.pay-list {
  margin: 0 24px;
  padding-bottom: 150px;

  .pay-list-card {
    margin-top: 20px;
    padding: 20px 40px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px - 60px;
    border-radius: 20px;
    color: #ffffff;
    background: url("@/assets/image/payListBG.png") no-repeat;
    background-size: 100%;

    .pay-list-amount {
      font-size: 73px;

      span {
        font-size: 36px;
      }

      > div:last-child {
        font-size: 24px;
      }
    }

    .pay-list-payTime {
      font-size: 28px;

    }

    .pay-list-amount-btn {
      width: 160px;
      line-height: 56px;
      text-align: center;
      border-radius: 28px;
      border: solid 1px #ffffff;
    }
  }
}


</style>