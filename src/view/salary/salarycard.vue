<template>
  <div class="salarycard">
    <HeadBack :title="route.meta.title"></HeadBack>
    <div v-if="isShowCard">
      <div class="salary-card-content">
        <div class="salary-card-content-icon"><img alt="银行卡" src="@/assets/image/card.png"></div>
        <div class="salary-card-content-info">
          <p>{{ cardName }}</p>
          <p>{{ cardNum }}</p>
        </div>
      </div>
      <div class="salary-card-content-but">
        <router-link :to="{path:'/addsalary',query:{flag:1}}">
          <Button plain type="primary">修改银行卡</Button>
        </router-link>
      </div>
    </div>
    <div v-else class="salary-card-not">
      <div><img alt="银行卡(空)" src="@/assets/image/NotBank.png"></div>
      <div>
        <p>您尚未添加银行卡</p>
        <p>银行卡用于薪资发放，快去添加吧</p>
      </div>
      <div class="salary-card-not-button">
        <router-link :to="{path:'/addsalary',query:{flag:0}}">
          <Button class="bigButton" type="primary">去添加</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue'
import {Button} from 'vant'
import {Desensitization} from '@/utils/RegIndex/desensitization';
import {bankBandQuery} from '@/API/bank'
import {ref} from "vue";
import {useRoute} from "vue-router";

const route=useRoute()

const isShowCard = ref<boolean>(true);
const cardNum = ref<string>('');
const cardName = ref<string>('');
const bankProvince = ref<string>('');
const bankAddress = ref<string>('');

bankBandQuery().then(res => {
  if (!res.data.info) {
    isShowCard.value = false;
  } else {
    isShowCard.value = true;
    cardNum.value = Desensitization.cardProcess(res.data.info.bankCardNumber);
    cardName.value = res.data.info.bankAccount;
    bankProvince.value = res.data.info.bankProvince;
    bankAddress.value = res.data.info.bankAddress;
  }
})
</script>
<style lang="scss" scoped>
.salarycard {
  padding: 40px 24px;
  height: 100%;
  background-color: #f7f7ff;
}

.salary-card-content {
  padding: 40px 30px;
  display: flex;
  height: 240px - 40px - 40px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 #f0f0f0;
  border-radius: 12px;

  .salary-card-content-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    //line-height: 60px;
    text-align: center;
    background-color: #f7f7ff;
    border-radius: 50%;

    img {
      width: 31px;
      height: 23px;
    }
  }

  .salary-card-content-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;
    color: #333333;
    text-align: left;

    p:first-child {
      line-height: 60px;
      font-size: 28px;
    }

    p:last-child {
      font-size: 40px;
    }
  }
}

.salary-card-content-but {
  margin-top: 50px;
  text-align: center;

  ::v-deep(button) {
    width: 480px;
    height: 80px;
    font-size: 28px;
    letter-spacing: 6px;
    background-color: #ff9c00;
    border-radius: 40px;
    color: #ffffff;
  }
}

.salary-card-not {
  padding-top: 120px;
  text-align: center;

  div:first-child {
    margin-bottom: 20px;

    img {
      width: (160px/0.9);
      height: (90px/0.9);
    }
  }

  p:first-child {
    line-height: 70px;
    font-size: 30px;
    color: #333333;
    font-weight: bolder;
  }

  p:last-child {
    font-size: 24px;
    color: #999999;
  }

  .salary-card-not-button {
    margin-top: 60px;
  }
}

</style>