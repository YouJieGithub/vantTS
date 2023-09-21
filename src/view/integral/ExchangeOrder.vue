<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <div class="order_list">
    <List v-model:loading="loading" :finished="finished" @load="onLoad">
      <div v-for="(item,index) in list" class="goods">
        <div class="goods-date">兑换日期：<span>{{ item.redeemTime }}</span></div>
        <div class="goods-detail">
          <div>
            <div class="goods-img"><img :src="item.mainUrl[0]" alt=""></div>
            <div class="goods-name">
              <div>{{ item.name }}
              </div>
              <div><span>{{ item.integralPrice }}</span>积分</div>
            </div>
          </div>
          <div>x<span>{{ item.count }}</span></div>
        </div>
        <div class="goods-total">合计：<span>{{ item.total }}</span><span> 积分</span></div>
      </div>
    </List>
  </div>
</template>

<script lang="ts" setup>
import {List} from 'vant';
import HeadBack from "@/components/header.vue";
import {useRoute} from "vue-router";
import {integralOrderList} from "@/API/points";
import {onBeforeMount, reactive, ref} from "vue";

interface pageTypes {
  limit:number,
  page:number
}

const route = useRoute()

const list = ref<any>([]);

const page = reactive<pageTypes>({
  limit: 10,
  page: 1
});
const total=ref<number>(0);

const loading=ref<boolean>(false);
const finished=ref<boolean>(false);

const getIntegralOrderList = (data:object) => {
  loading.value=true;
  integralOrderList(data).then(res => {
    list.value =list.value.concat(res.data.rows);
    total.value=res.data.total;
    finished.value = list.value.length === total.value;
    loading.value=false;
  })
};

const onLoad=()=>{
  page.page=page.page+1;
  getIntegralOrderList(page)
}

onBeforeMount(() => {
  getIntegralOrderList(page)
})
</script>

<style lang="scss" scoped>
.order_list {
  padding-bottom: 20px;

  .goods {
    margin: 20px 24px;
    padding: 30px;
    font-size: 24px;
    color: #333333;
    background-color: #ffffff;
    border-radius: 24px;

    .goods-date {
      font-weight: bolder;
    }

    .goods-detail {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div:first-child {
        margin-right: 80px;
        display: flex;

        .goods-img {
          margin-right: 30px;
          width: 140px;
          height: 140px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
          }
        }

        .goods-name {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }

    .goods-total {
      margin-top: 45px;
      text-align: right;

      span {
        color: #fb5920;
      }

      > span:first-child {
        font-size: 36px;
        font-weight: bolder;
      }

      > span:last-child {
        font-size: 28px;
      }
    }
  }
}
</style>