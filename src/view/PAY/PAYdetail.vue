<template>
  <HeadBack title="申请详情"/>
  <div class="pay-detail">
    <div class="list_none-icon">
      <Empty :description="detail.stateStr" :image="ListNone" class="pay-detail-empty"></Empty>
      <p>{{ detail.tip }}</p>
    </div>
    <div class="card">
      <div class="card-title-before">申请进度</div>
      <div class="steps-card">
        <div v-for="(item,index) in detail.setps" :key="index" class="step-card">
          <div class="step-content">
            <div>{{ item.title }}</div>
            <div>{{ item.time }}</div>
          </div>
          <div :class="detail.state===1?'step-line-state':'step-line'"></div>
          <div :class="index===0?'step-font-svg':'step-icon'">
            <fontSvg v-if="index===0" :icon="'#icon-a-shijianjiedian_huaban1fuben97'"/>
          </div>
        </div>
        <!--        <Steps direction="vertical" :active="0" active-color="#ff9c00" active-icon=" icon-a-shijianjiedian_huaban1fuben97" icon-prefix="iconfont">-->
        <!--          <Step><Cell :border="false" title="拒绝退款，您不满足退款条件。" label="2023-09-09 10:03:10"></Cell></Step>-->
        <!--          <Step><Cell :border="false" title="拒绝退款，您不满足退款条件。" label="2023-09-09 10:03:10"></Cell></Step>-->
        <!--          <Step><Cell :border="false" title="拒绝退款，您不满足退款条件。" label="2023-09-09 10:03:10"></Cell></Step>-->
        <!--          <Step><Cell :border="false" title="拒绝退款，您不满足退款条件。" label="2023-09-09 10:03:10"></Cell></Step>-->
        <!--        </Steps>-->
      </div>
    </div>
    <div class="card">
      <div class="card-title-before">退款申请</div>
      <CellGroup :border="false" class="proof-cell-group">
        <Cell :border="false" :value="detail.payTime" class="proof-cell" title="支付时间：" title-class="proof-title"
              value-class="proof-value"></Cell>
        <Cell :border="false" :value="`￥${detail.money}`" class="proof-cell" title="支付金额：" title-class="proof-title"
              value-class="proof-value"></Cell>
        <Cell v-if="[3,4].includes(detail.state)" :border="false" :value="`￥${detail.refundMoney}`" class="proof-cell"
              title="退款金额："
              title-class="proof-title" value-class="proof-value"></Cell>
        <Cell v-if="detail.state===2" :border="false" :value="detail.rejectReason" class="proof-cell" title="拒绝原因："
              title-class="proof-title"
              value-class="proof-value"></Cell>
      </CellGroup>
    </div>
  </div>
  <div class="card">
    <div class="card-title-before" style="border-bottom: none;">退款凭证</div>
    <div class="proof">
      <VanImage v-for="(item,index) in detail.imgList" :key="index" :src="item.imgUrl" class="proof-img" fit="cover"
                lazy-load @click="ImageClick(index)"></VanImage>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {Cell, CellGroup, Empty, Image as VanImage, showImagePreview} from "vant";
import HeadBack from "@/components/header.vue";
import fontSvg from '@/components/fontSvg.vue';
import {onBeforeMount, ref} from "vue";
import {recordApply} from "@/API/pay";

const ListNone: any = new URL('../../assets/image/refusalOfRefund.png', import.meta.url).href;

const amountID = ref<number | string | string[]>(history.state.id);


const detail = ref<any>('')
const getRecordApply = () => {
  recordApply(amountID.value).then((res: any) => {
    let data = res.data.rows;
    switch (data.state) {
      case 1:
        data.stateStr = '待审批';
        data.tip = '退款申请已提交，后台抓紧审批中';
        data.setps = [
          {
            title: '后台审批中，请耐心等待。',
            time: ''
          },
          {
            title: '退款申请已提交。',
            time: data.applyTime
          }
        ]
        break;
      case 2:
        data.stateStr = '拒绝退款';
        data.tip = '非常抱歉，您不满足退款条件';
        data.setps = [
          {
            title: '拒绝退款,您不满足退款条件',
            time: data.approvalTime
          },
          {
            title: '退款申请已提交。',
            time: data.applyTime
          }
        ]
        break;
      case 3:
        data.stateStr = '退款中';
        data.tip = '请耐心等待退款到账';
        data.setps = [
          {
            title: '退款请求已发送至银行，请耐心等待。',
            time: data.initiateTime
          },
          {
            title: '后台审批通过，退款将原路返回。',
            time: data.approvalTime
          },
          {
            title: '退款申请已提交。',
            time: data.applyTime
          }
        ]
        break;
      case 4:
        res.data.rows.stateStr = '退款成功';
        res.data.rows.tip = '请注意查收';
        data.setps = [
          {
            title: '已退还至付款银行，请注意查收。',
            time: data.successTime
          },
          {
            title: '退款请求已发送至银行，请耐心等待。',
            time: data.initiateTime
          },
          {
            title: '后台审批通过，退款将原路返回。',
            time: data.approvalTime
          },
          {
            title: '退款申请已提交。',
            time: data.applyTime
          }
        ]
        break;
    }
    detail.value = res.data.rows;
  })
}

const ImageClick = (sub: number) => {
  showImagePreview({
    images: detail.value.imgList.map((r: any) => r.imgUrl),
    startPosition: sub,
  });
}

onBeforeMount(() => {
  getRecordApply()
})

</script>

<style lang="scss" scoped>
@import "@/assets/css/public.scss";

.pay-detail {
  background: url("@/assets/image/paydetailBG.png") no-repeat top;
  background-size: 100% 390px;
}

.list_none-icon {
  padding-bottom: 30px;
  text-align: center;

  .pay-detail-empty {
    padding-bottom: 0;

    :deep(.van-empty__image) {
      width: 125px;
      height: 98px;
    }

    :deep(.van-empty__description) {
      margin-top: 37px;
      font-size: 28px;
      color: #ffffff;
      font-weight: bolder;
    }
  }

  p {
    line-height: 45px;
    font-size: 24px;
    color: #ffffff;
  }
}

.proof {
  margin: 0 0 40px;

  .proof-img {
    margin-right: 20px;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 8px;
  }
}

.steps-card {
  padding-top: 10px;
  padding-left: 10px;

  .step-card {
    position: relative;
  }

  .step-content {
    padding: 25px 25px 25px 35px;
    font-size: 24px;
    color: #999999;

    > div:last-child {
      color: #999999;
    }
  }

  .step-font-svg {
    position: absolute;
    top: 22px;
    left: -14px;
    width: 24px;
    height: 24px;
    z-index: 1;
  }

  .step-icon {
    position: absolute;
    top: 34px;
    left: -7px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #e6e6e6;
    z-index: 999;
  }

  .step-line-state {
    position: absolute;
    top: 30px;
    left: 0;
    width: 1px;
    height: 98px;
    background: #e6e6e6;
    z-index: 1;
  }

  .step-line {
    position: absolute;
    top: 30px;
    left: 0;
    width: 1px;
    height: 128px;
    background: #e6e6e6;
    z-index: 1;
  }

  .step-card:first-child {
    .step-content {
      > div:first-child {
        color: #333333;
      }
    }
  }

  .step-card:last-child {
    .step-line, .step-line-state {
      display: none;
    }
  }
}

.proof-cell-group {
  margin-top: 20px;

  .proof-cell {
    padding: 0;
    line-height: 28px + 36px;
    font-size: 28px;

    :deep(.proof-title) {
      color: #999999;
    }

    :deep(.proof-value) {
      color: #333333;
    }
  }
}


</style>