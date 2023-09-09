<template>
  <HeadBack title="报案理赔"></HeadBack>
  <div class="claims-list">
    <VanImage :src="GuidelinesGuideImg" fit="contain" @click="$router.push('/Insurance')"/>
    <div v-if="!!AccidentListItem.length" class="claims-list-contentBody">
      <CellGroup v-for="(item,index) in AccidentListItem" :key="index" :border="false" class="claims-list-body" inset>
        <Cell :icon="claimsTypeIcon(`claimsStatus${item.status}`)" :title="claimsTitle(item.status)"
              :to="{ path: '/claimsDetails', query: { ID: item.accidentId }}"
              class="claims-list-body-cell" is-link
              title-class="claims-list-body-title" value="查看详情" value-class="claims-list-body-value"></Cell>
        <div class="claims-list-content">
          <Icon class="iconfont icon-qishouxingming-57"/>
          <p>骑手姓名：</p>
          <p>{{ item.staffName }}</p>
        </div>
        <div class="claims-list-content">
          <Icon class="iconfont icon-shifashijian-58"/>
          <p>事发时间：</p>
          <p>{{ item.eventTime }}</p>
        </div>
        <div class="claims-list-content">
          <Icon class="iconfont icon-shifadidian-59"/>
          <p>事发地点：</p>
          <p>{{ item.eventPlace }}</p>
        </div>
      </CellGroup>
    </div>
    <div v-else class="list_none-icon">
      <Empty :image="ListNone" description="暂无报案"></Empty>
    </div>
  </div>
  <div class="claims-list-button">
    <Button to="/newClaims" type="primary">我 要 报 案</Button>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Button, Cell, CellGroup, Empty, Icon, Image as VanImage} from 'vant';
import '@/assets/font/iconfont.css';
import {onBeforeMount, ref} from "vue";
import {accidentList} from "@/API/InsuranceClaims";


const GuidelinesGuideImg: any = new URL('../../assets/image/accidentGuide.png', import.meta.url).href;
const ListNone: any = new URL('../../assets/image/ListNone.png', import.meta.url).href;

const claimsTypeIcon = (res: string) => {
  return new URL(`../../assets/image/${res}.png`, import.meta.url).href;
};
const claimsTitle = (val: number) => {
  switch (val) {
    case 0:
      return '跟进中'
    case 1:
      return '案件撤销'
    case 2:
      return '关单待审核'
    case 3:
      return '已结案'
  }
}

const AccidentListItem = ref<any>('');

onBeforeMount(() => {
  getAccidentList()
})

const getAccidentList = () => {
  accidentList().then(res => {
    AccidentListItem.value = res.data.rows;
  })
}


</script>

<style lang="scss" scoped>
:global(#app) {
  min-height: 100%;
  height: max-content;
}

.claims-list {
  margin: 0 24px;
  height: 100%;

  .claims-list-contentBody {
    padding-bottom: 150px;
  }

  .claims-list-body {
    margin-right: 0;
    margin-left: 0;
    margin-bottom: 20px;
    padding-bottom: 30px;

    .claims-list-body-cell {
      margin-bottom: 29px;
    }

    .claims-list-body-cell::after {
      border: 1px dashed #dadada;
    }

    :deep(.van-cell--borderless) {
      padding-bottom: 30px;
      display: flex;
      align-items: center;
    }

    :deep(.claims-list-body-title) {
      font-size: 28px;
      color: #333333;
    }

    :deep(.claims-list-body-value) {
      font-size: 24px;
      color: #ff9c00;
    }

    :deep(.van-cell__right-icon) {
      color: #ff9c00;
      font-size: 20px;
    }

    :deep(.van-cell--clickable .van-cell__left-icon) {
      margin-right: 20px;
      display: flex;
      align-items: center;
    }

    .claims-list-content {
      padding: 0 30px;
      display: flex;
      align-items: center;
      line-height: 46px;
      font-size: 24px;
      color: #999999;

      p:nth-of-type(1) {
        min-width: 120px;
      }

      p:last-child {
        font-weight: bolder;
      }

      .iconfont {
        margin-right: 10px;
        font-size: 22px;
        color: #aaaaaa;
      }
    }

    .claims-list-content:last-child {
      display: flex;
      align-items: baseline;
    }
  }

  .list_none-icon {
    margin-top: 100px;

    :deep(.van-empty__image) {
      width: 120px;
      height: 120px;
    }

    :deep(.van-empty__description) {
      font-size: 30px;
      font-weight: bolder;
      color: #000000;
    }
  }
}

.claims-list-button {
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 143px;
  background: #ffffff;

  button {
    width: 500px;
    height: 80px;
    box-shadow: 0 8px 19px 1px #ead8ad;
    border-radius: 40px;
  }
}

</style>