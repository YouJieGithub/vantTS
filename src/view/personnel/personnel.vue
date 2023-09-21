<template>
  <div class="sticky-personnel">
    <HeadBack :title="route.meta.title"></HeadBack>
    <Search v-model="searchValue" background="#f7f7ff" class="search-class" placeholder="请输入姓名或手机号码搜索"
            @clear="onInitStaff" @search="onInitStaff"/>
    <Tabs v-model:active="active" background="#f7f7ff" color="#ff9c00" title-active-color="#ff9c00"
          @change="onInitStaff">
      <Tab v-for="(item,index) in tabs" :name="index" :title="item"></Tab>
    </Tabs>
  </div>
  <List
      v-model:loading="loading"
      :finished="finished"
      :finished-text="finishedText"
      :immediate-check="false"
      class="personnel-page"
      @load="onLoad"
  >
    <div v-for="item in personnelList" :key="item.id" class="personnel">
      <div class="personnel-user">{{ item.staffName }}
        <Tag class="personnel-user-tag" color="#f7f7ff" text-color="#ff9c00">{{ item.departmentName }}</Tag>
      </div>
      <div class="personnel-info">
        <div>手机号码：<span>{{ item.telephone }}</span></div>
        <div>工号：<span>{{ item.jobNumber }}</span></div>
      </div>
      <div class="personnel-info">
        <div>美团ID：<span>{{ item.mt_number }}</span></div>
        <div>入职日期：<span>{{ item.entryDate }}</span></div>
      </div>
    </div>
  </List>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {List, Search, Tab, Tabs, Tag} from 'vant';
import {onBeforeMount, ref} from "vue";
import {staffList} from "@/API/personnel";
import {useRoute} from "vue-router";

const route=useRoute()

const tabs = ref<Array<string>>(['试岗期', '正式', '离职中', '已离职'])
const personnelList = ref<Array<any>>([]);
const personnelListTotal = ref<number>(0);
const page = ref<number>(1);    //用onLoad上拉加载代替了onBeforeMount生命周期函数
const limit = ref<number>(10);
const searchValue = ref<string>('');
const active = ref<number>(0);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const finishedText = ref<string>('');

const onLoad = () => {
  page.value += 1;
  getStaffList();
};

const onInitStaff = () => {
  page.value = 1;
  personnelList.value = [];
  finishedText.value = '';
  getStaffList()
};
const getStaffList = () => {
  loading.value = true;
  let data = {
    username: searchValue.value,
    queryType: active.value
  }
  staffList(page.value, limit.value, data).then(res => {
    personnelList.value = personnelList.value.concat(res.data.rows);
    personnelListTotal.value = res.data.total;
    loading.value = false;
    if (personnelList.value.length < personnelListTotal.value) {
      finished.value = false;
      finishedText.value = '上拉加载更多';
    } else {
      finished.value = true;
      finishedText.value = '没有更多了';
    }
  })
};

onBeforeMount(() => {
  getStaffList()
})
</script>

<style lang="scss" scoped>
//公共样式
@import "@/assets/css/customizationVant.scss";

.sticky-personnel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background: #ffffff;
}

.personnel-page {
  margin-top: 284px;
  padding: 20px 0;
  background-color: #f7f7ff;
}


.personnel {
  margin: 0 24px 20px;
  padding: 30px 30px 0 30px;
  height: 170px;
  background-color: #ffffff;
  border-radius: 12px;

  .personnel-user {
    margin-bottom: 24px;
    font-size: 28px;
    color: #333333;
    text-align: left;

    .personnel-user-tag {
      padding: 5px 12px;
      font-size: 20px;
      transform: scale(0.78);
      border-radius: 4px;
      vertical-align: middle;
    }
  }

  .personnel-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    color: #999999;

    > div {
      flex: 1;
      line-height: 42px;
      text-align: left;

      span {
        font-weight: bolder;
      }
    }
  }
}
</style>