<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <div class="notice_detail">
    <div>
      <p class="notice_detail_title">{{ Info.title }}</p>
      <p class="notice_detail_author">{{ Info.author }}</p>
      <p class="notice_detail_author">{{ Info.pushTime }}</p>
    </div>
    <div v-html="Info.content"></div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {noticeDetail, noticeUpdateStatus} from '@/API/notice';
import {useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";

const route = useRoute();

const Info = ref<any>('');

onBeforeMount(() => {
  noticeDetail(Number(route.query.id)).then(res => {
    Info.value = res.data.info;
  });
  if (Number(route.query.status) === 1) {
    noticeUpdateStatus(Number(route.query.id)).then()
  }
})
</script>

<style lang="scss" scoped>
.notice_detail {
  padding: 24px;
  background: #ffffff;

  :deep(div:last-child) {
    word-break: break-all;
    font-size: 12pt;

    ol, ul {
      margin: auto;
      padding-left: 60px;
    }
  }
}

.notice_detail_title {
  margin-top: 50px;
  margin-bottom: 40px;
  font-size: 36px;
  font-weight: bolder;
  color: #333333;
  word-break: break-all;
}

.notice_detail_author {
  line-height: 40px;
  font-size: 24px;
  color: #999999;
}
</style>