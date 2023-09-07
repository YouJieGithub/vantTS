<template>
  <HeadBack title="申请记录"></HeadBack>
  <div v-for="item in list" :key="item.id" class="resign_list">
    <div>
      <p>离职原因：{{ item.reason }}</p>
      <p>申请时间：{{ item.applyTime }}</p>
    </div>
    <Divider></Divider>
    <div class="resign_list_bottom">
      <p>审批状态：<span style="color: #ee7e2b;">{{ statusArray[item.status] }}</span></p>
      <p v-show="![0,1,3].includes(item.status)" style="color: #ff9c00;" @click="Cancel(item.resignId)">取消申请</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Divider, showConfirmDialog} from 'vant';
import {onBeforeMount, ref} from "vue";
import {resignCancel, resignList} from "@/API/login";

const list = ref<Array<any>>([]);
const statusArray = ref<Array<string>>(['同意', '驳回', '待审批', '已取消'])

const getResignlist = () => {
  resignList().then(res => {
    list.value = res.data.rows;
  })
};

/**
 * 取消申请
 * data  离职ID
 * @constructor
 */
const Cancel = (Id: number) => {
  showConfirmDialog({
    message: '确认取消离职申请？',
    confirmButtonColor: "#ff9c00"
  }).then(() => {
    resignCancel(Id).then(() => {
      getResignlist()
    })
  }).catch(() => {
  });
}
onBeforeMount(() => {
  getResignlist()
})
</script>

<style lang="scss" scoped>
.resign_list {
  margin: 0 24px 20px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px;

  div {
    font-size: 24px;
    color: #333333;
  }

  .resign_list_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>