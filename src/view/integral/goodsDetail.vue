<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <Swipe autoplay="3000" class="detail_Swipe">
    <SwipeItem v-for="(item,index) in detail.mainUrl" :key="index" class="detail_img"><img :src="item" alt="">
    </SwipeItem>
    <template #indicator="{ active, total }">
      <div class="custom-indicator"></div>
      <div class="custom-indicator-text">{{ active + 1 }}/{{ total }}</div>
    </template>
  </Swipe>
  <div class="detail-BasicInfo">
    <div class="BasicInfo-integral">
      <div>{{ detail.integralPrice }}<span> 积分</span></div>
      <div>库存：{{ detail.inventory }}</div>
    </div>
    <div class="BasicInfo-name">{{ detail.name }}</div>
    <div class="BasicInfo-price">市场价格：{{ detail.price }}</div>
  </div>
  <Divider class="BasicInfo-info">宝贝详情</Divider>
  <div class="BasicInfo-info_details_content">
    <div v-if="detail.introduce!=''" class="BasicInfo-info_text_img" :class="detail.url.length!=0?'':'BasicInfo-info_text'">{{ detail.introduce }}</div>
    <div class="BasicInfo-info-img"><img v-for="item in detail.url" :key="item" :src="item" alt=""></div>
  </div>
  <div class="goodsDetail_submit van-hairline--top">
    <div>我的积分：{{ route.query.integral }}</div>
    <div @click="router.push({path:'/ConfirmExchange',query:{id:detail.id}})">立即兑换</div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from "@/components/header.vue";
import {useRoute} from "vue-router";
import {Swipe, SwipeItem, Divider} from 'vant';
import {productDetail} from "@/API/points";
import {onBeforeMount, ref} from "vue";
import router from "@/router";

const route = useRoute();

const detail = ref<any>({})

const getGoodsDetail = (id: any) => {
  productDetail(id).then(res => {
    detail.value = res.data.rows;
  })
}

onBeforeMount(() => {
  getGoodsDetail(route.query.id)
})


</script>

<style lang="scss" scoped>
.nav {
  :deep(.van-nav-bar) {
    background: #ffffff;
  }
}

.detail_Swipe {
  position: relative;
  background: #ffffff;

  .detail_img {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 520px;
    }
  }

  .custom-indicator {
    position: absolute;
    left: 50%;
    bottom: 27px;
    transform: translateX(-50%);
    width: 60px;
    height: 34px;
    background-color: #000000;
    border-radius: 17px;
    opacity: 0.2;
  }

  .custom-indicator-text {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    font-size: 20px;
    color: #ffffff;
  }
}

.detail-BasicInfo {
  margin: 20px 24px;
  padding: 40px 30px;
  background: #ffffff;
  border-radius: 24px;

  .BasicInfo-integral {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:first-child {
      font-size: 40px;
      color: #fb5920;

      span {
        font-size: 32px;
      }
    }

    > div:last-child {
      font-size: 24px;
      color: #999999;
    }
  }

  .BasicInfo-name {
    line-height: 60px;
    font-size: 28px;
    font-weight: 600;
    color: #333333;
  }

  .BasicInfo-price {
    font-size: 24px;
    color: #999999;
  }
}

.BasicInfo-info {
  color: #999999;
  border-color: #999999;
  padding: 0 240px;
}

.BasicInfo-info_details_content {
overflow: auto;

  .BasicInfo-info_text_img {
    padding: 24px;
    font-size: 24px;
    color: #333333;
    background: #ffffff;
  }
  .BasicInfo-info_text{
    margin-bottom: 100px;
    min-height: 484px;
  }

  .BasicInfo-info-img {
    margin-bottom: 100px;

    img {
      width: 100%;
    }
  }
}


.goodsDetail_submit {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #ffffff;

  > div:first-child {
    font-size: 24px;
    color: #999999;
  }

  > div:last-child {
    width: 200px;
    line-height: 70px;
    text-align: center;
    background-color: #fb5920;
    border-radius: 35px;
    font-size: 32px;
    color: #ffffff;
  }
}
</style>