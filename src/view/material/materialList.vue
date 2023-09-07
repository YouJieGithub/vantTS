<template>
  <HeadBack title="通知详情"></HeadBack>
  <div>
    <div class="list">
      <div class="list-title">
        <div><span>订单编号：</span><span>XS20230424-0002</span></div>
        <div class="list-order-money">￥400</div>
      </div>
      <div class="list-body">
        <div><span>物料：</span><span>餐箱x1、夏季工服x1</span></div>
        <div><span>购买日期：</span><span>2023-04-24</span></div>
        <div><span>购买方式：</span><span>现金</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {onBeforeMount, ref} from "vue";
import {materialList} from "@/API/material";

const list = ref<object>({})

onBeforeMount(() => {
  materialList().then(res => {
    console.log(res)
  })
})

</script>

<style lang="scss" scoped>
.list {
  margin: 0 24px;
  padding-bottom: 30px;
  height: 242px;
  font-size: 24px;
  color: #333333;
  background-color: #ffffff;
  border-radius: 16px;

  .list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 23px 0 30px;
    line-height: 77px;

    .list-order-money {
      color: #0089ff;
      font-weight: bolder;
    }
  }

  .list-body {
    padding: 0 23px 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    height: 164px;
  }
}
</style>