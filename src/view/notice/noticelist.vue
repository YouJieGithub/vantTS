<template>
  <HeadBack title="通知"></HeadBack>
  <Sticky :offset-top="46">
    <Search v-model="searchVal" background="#f7f7ff" class="search-class" placeholder="搜索通知标题"
            @clear="getNoticeList" @search="getNoticeList"/>
    <div class="tab">
      <div :style="flag===0?'color:#333333':'color:#999999'" @click="onTab(0)">全部</div>
      <div :style="flag===1?'color:#333333':'color:#999999'" @click="onTab(1)">未读</div>
    </div>
  </Sticky>
  <List v-model:loading="loading" :finished="finished" :immediate-check="false"
        @load="onLoad">
    <Cell v-for="item in NoticeList" :key="item" :to="{path:'/noticedetail',query:{id:item.id,status:item.status}}"
          center
          is-link>
      <template #title>
        <div class="notice_tilte">
          <div class="notice_tilte-text van-ellipsis">{{ item.title }}</div>
          <div v-if="item.status===1" class="badge_dot"></div>
        </div>
      </template>
      <template #label>
        <div><span class="notice_tilte_author">{{ item.author }}</span><span>{{ item.pushTime }}</span></div>
      </template>
    </Cell>
  </List>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Cell, List, Search, Sticky} from 'vant';
import {onBeforeMount, ref} from "vue";
import {noticeList} from '@/API/notice'

const flag = ref<number>(0);
const page = ref<number>(1);
const limit = ref<number>(10);
const searchVal = ref<string>('');
const NoticeList = ref<Array<any>>([]);
const NoticeTotal = ref<number>(0);

const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const finishedText = ref<string>('');

const onLoad = () => {
  page.value += 1;
  getNoticeList();
};

const onTab = (val: number) => {
  flag.value = val;
  getNoticeList()
};

const getNoticeList = () => {
  loading.value = true;
  noticeList(page.value, limit.value, flag.value, searchVal.value).then(res => {
    NoticeTotal.value = res.data.total;
    NoticeList.value = res.data.rows;
    loading.value = false;
    if (NoticeList.value.length < NoticeTotal.value) {
      finished.value = false;
      finishedText.value = '上拉加载更多';
    } else {
      finished.value = true;
      finishedText.value = '没有更多了';
    }
  })
};

onBeforeMount(() => {
  getNoticeList()
})
</script>

<style lang="scss" scoped>
//公共样式
@import "@/assets/css/customizationVant.scss";

.tab {
  padding: 0 24px 24px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  background: #f7f7ff;

  div {
    margin-right: 20px;
    width: 80px;
    line-height: 44px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
  }
}

.notice_tilte {
  display: flex;
  align-content: center;

  .notice_tilte-text {
    max-width: 500px;
  }

  .badge_dot {
    position: relative;
    margin-left: 20px;
  }

  .badge_dot::after {
    position: absolute;
    right: 0;
    top: 50%;
    content: '';
    width: 7px;
    height: 6px;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: #f26a19;
  }
}

.notice_tilte_author {
  margin-right: 10px;
}

</style>