<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <div class="address_radius">
    <div class="address">
      <div><span>{{ addressInfo.uasername }}</span><span>{{ addressInfo.telephone }}</span></div>
      <div><span>{{ addressInfo.address }}</span></div>
      <div>
        <Icon name="info-o"/>
        商品将寄往站点，请注意查收
      </div>
    </div>
  </div>
  <div class="detail_info">
    <div class="info">
      <div class="info_img"><img :src="detail.mainUrl[0]" alt=""></div>
      <div class="info_name">
        <div>{{ detail.name }}</div>
        <div>{{ detail.integralPrice }}积分</div>
      </div>
    </div>
    <div class="info_num">
      <div>兑换数量：</div>
      <Stepper v-model="numVal" class="info_num_stepper" disable-input @change="stepperChange"></Stepper>
    </div>
    <div class="info_total">
      <div>合计：</div>
      <div>{{math.divide(numTotal,100)}} <span>积分</span></div>
    </div>
  </div>
  <SubmitBar :decimal-length="0" :price="numTotal" button-color="#fb5920" button-text="立即兑换" class="Submit_Bar"
             currency="" placeholder safe-area-inset-bottom suffix-label=" 积分"
             @submit="onSubmit"></SubmitBar>
  <Overlay :show="feedbackShow">
    <div class="feedback_dialog">
      <div>
        <fontSvg :icon="'#icon-a-gantanhao_huaban1fuben104'"/>
      </div>
      <div>
        <p class="feedback_dialog_title">{{feedbackText}}</p>
      </div>
      <div>
        <Button class="bigButton again_feedback" @click="feedbackShow=false;">我知道了
        </Button>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import HeadBack from "@/components/header.vue";
import {useRoute} from "vue-router";
import {Icon, Stepper, SubmitBar, showConfirmDialog, Overlay, Button} from 'vant'
import {address, productDetail, submitOrder} from "@/API/points";
import {onBeforeMount, ref} from "vue";
import * as math from "mathjs";
import FontSvg from "@/components/fontSvg.vue";
import router from "@/router";

const route = useRoute()

const detail = ref<any>({mainUrl:[]});

const numVal = ref<number>(1);
const numTotal = ref<any>(0);

const stepperChange = (value: string) => {
  numTotal.value = math.multiply(math.multiply(Number(value), detail.value.integralPrice), 100);
}
const getGoodsDetail = (id: any) => {
  productDetail(id).then(res => {
    detail.value = res.data.rows;
    numTotal.value = math.multiply(math.multiply(numVal.value, detail.value.integralPrice), 100);
  })
};

const addressInfo = ref<any>({})
const getAddress = () => {
  address().then((res: any) => {
    addressInfo.value = res.data.address;
  })
}

onBeforeMount(() => {
  getGoodsDetail(route.query.id)
  getAddress()
})

const feedbackShow=ref<boolean>(false);
const feedbackText=ref<string>('');
const onSubmit = () => {
  showConfirmDialog({
    message: '确认兑换吗？',
    confirmButtonColor: "#fb5920"
  }).then(() => {
    let data = {
      count: numVal.value,
      integralProductsId: detail.value.id,
      address: addressInfo.value.address
    }
    submitOrder(data).then(res => {
      if (res.data.data!=='下单成功'){
        feedbackShow.value=true;
        feedbackText.value=res.data.data;
      }else {
        router.push('ExchangeOrder')
      }

    })
  }).catch()
}
</script>

<style lang="scss" scoped>
.address_radius {
  margin: 20px 24px;
  border-radius: 24px;
  background-color: #ffffff;
}

.address {
  padding: 30px;
  position: relative;
  border-radius: 24px;


  color: #333333;

  > div:nth-of-type(1) {
    font-size: 28px;

    span {
      margin-right: 30px;
    }
  }

  > div:nth-of-type(2) {
    font-size: 32px;
    font-weight: 600;

    span {
      margin-right: 30px;
    }
  }

  > div:nth-of-type(3) {
    line-height: 60px;
    font-size: 24px;
    color: #fb5920;

    i {
      margin-right: 20px;
    }
  }
}

.address:before {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 2px;
  background: repeating-linear-gradient(315deg, #84a1ff 0, #84a1ff 35%, transparent 0, transparent 45%, #ff6f8e 0, #ff6f8e 85%, transparent 0, transparent 95%);
  background-size: 80px;
  content: "";
}


.detail_info {
  margin: 20px 24px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 24px;
  font-size: 24px;
  color: #333333;

  .info {
    display: flex;

    .info_img {
      margin-right: 30px;
      width: 140px;
      height: 140px;
      border-radius: 12px;

      img {
        width: 140px;
        height: 140px;
      }
    }

    .info_name {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > div:first-child {
        font-weight: 600;
      }
    }
  }

  .info_num {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info_num_stepper {
      line-height: 50px;
      border-radius: 10px;
      border: solid 1px #ececec;

      :deep(button) {
        width: 50px;
        height: 50px;
        background-color: #ffffff;
        font-size: 28px;
      }

      :deep(.van-stepper__minus) {
        color: #333333;
        border-right: solid 1px #ececec;
      }

      :deep(.van-stepper__plus) {
        color: #333333;
        border-left: solid 1px #ececec;

      }
    }
  }

  .info_total {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:last-child {
      font-size: 36px;
      color: #fb5920;
      font-weight: 600;

      span {
        font-size: 28px;
      }
    }
  }
}

.Submit_Bar {
  :deep(.van-submit-bar__bar) {
    padding-top: 25px;
    padding-bottom: 25px;

    .van-submit-bar__text {
      font-size: 24px;
      color: #333333;

      .van-submit-bar__price-integer {
        font-size: 36px;
        font-weight: 600;
        color: #fb5920;
      }

      .van-submit-bar__suffix-label {
        font-size: 28px;
        color: #fb5920;
      }
    }
  }
}
.feedback_dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 460px - 120px;
  height: 460px - 60px;
  border-radius: 20px;
  background: #ffffff;

  div:first-child {
    margin-top: 20px;
    width: 90px;
    height: 90px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  div:nth-of-type(2) {
    text-align: center;

    .feedback_dialog_title {
      font-size: 32px;
      font-weight: 600;
      color: #333333;
    }
  }

  div:last-child {
    width: 100%;

    .again_feedback {
      width: 100%;
      letter-spacing: 16px;
      color: #ffffff;
      background: #fb5920;
    }
  }
}
</style>