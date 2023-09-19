<template>
  <HeadBack title="申请记录"/>
  <div class="records">
    <div v-for="(item,index) in payList" :key="index" :style="index===payList.length-1?'border:none':''"
         class="records-list" @click="router.push({name:'PAYdetail',state:{id:item.id}})">
      <div class="records-list-title">
        <div>退款</div>
        <div>￥{{ item.money }}</div>
      </div>
      <div class="records-list-status">
        <div>申请时间：{{ item.payTime }}</div>
        <div :style="item.state===4?'color: #ff9c00':''">
          {{ ['待审批', '拒绝退款', '退款中', '退款完成'].filter((r, i) => i + 1 === item.state).toString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from "@/components/header.vue";
import {onBeforeMount, ref} from "vue";
import {refundApplyList} from "@/API/pay";
import {IDataType} from "@/service";
import {useRouter} from "vue-router";

const router = useRouter();
const payList = ref<any>([])
const getRecordApplyList = () => {
  refundApplyList().then((res: IDataType) => {
    if (!!res) {
      payList.value = res.data.rows;
    }
  })
}

onBeforeMount(() => {
  getRecordApplyList()
})
</script>

<style lang="scss" scoped>
.records {
  padding: 0 22px;
  background: #ffffff;

  .records-list {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 154px - 74px;
    border-bottom: 1px solid #ececec;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    > div:first-child {
      color: #333333;
      font-size: 28px;
    }

    > div:last-child {
      font-size: 24px;
      color: #999999;
    }
  }
}
</style>