<template>
  <HeadBack title="报案详情"></HeadBack>
  <div :style="levelIconBG">
    <div :style="`background-image:url(./image/claimsStatusBG${claimsDetails.status}.png)`" class="claims_details-body">
      <div class="claims_details-body-title">
        {{ statusToStr(claimsDetails.status) }}
        <p>事件编码：<span>{{ claimsDetails.eventCode }}</span></p>
      </div>
      <CellGroup :border="false" class="claims_details">
        <div class="claims_details_title"><span>1</span>报案人</div>
        <Cell :border="false" :value="claimsBaseDetails.staffName" title="骑手姓名"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.telephone" title="手机号码" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsBaseDetails.identityNumber" title="身份证号码"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsBaseDetails.city" title="事发城市" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.cityManager" title="城市负责人"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsBaseDetails.station" title="站点名称"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.header" title="站长" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
      </CellGroup>
      <CellGroup :border="false" class="claims_details">
        <div class="claims_details_title"><span>2</span>案件描述</div>
        <Cell :border="false" :value="claimsDetails.eventTime" title="事发时间" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.eventPlace" title="事发地点" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.eventDesc" title="事情经过" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
      </CellGroup>
      <CellGroup :border="false" class="claims_details">
        <div class="claims_details_title"><span>3</span>事故判定</div>
        <Cell :border="false" :value="claimsDetails.businessType" title="所属业务"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.toolType" title="交通工具类型"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.level" title="事件等级" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value level-icon"></Cell>
        <Cell :border="false" title="事件状态" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value status-icon">
          <template #value>
            <Icon :name="statusSrc(claimsDetails.status)"></Icon>
            <span>{{ statusToStr(claimsDetails.status) }}</span>
          </template>
        </Cell>
        <Cell :border="false" :value="claimsDetails.eventType" title="事件类型" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.natureType" title="事件性质" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.accidentType" title="事故定性"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.isCorrected" title="是否按流程提报"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.isRelated" title="是否涉及特殊人群"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.isReported" title="是否24小时内报案"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.isWeared" title="骑手是否戴头盔"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.result" title="交通事故判定结果"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.casualties" title="伤亡人数和财损预估"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
      </CellGroup>
      <CellGroup :border="false" class="claims_details">
        <div class="claims_details_title"><span>4</span>保险理赔</div>
        <Cell :border="false" :value="claimsDetails.policyNumber" title="保单号" title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
        <Cell :border="false" :value="claimsDetails.payAmount" title="平台理赔金额"
              title-class="claims_details_cell-title"
              value-class="claims_details_cell-value"></Cell>
      </CellGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Cell, CellGroup, Icon} from 'vant';
import {onBeforeMount, ref} from "vue";
import {accidentDetail} from "@/API/InsuranceClaims";
import {useRoute} from "vue-router";

const route = useRoute();


onBeforeMount(() => {
  getAccidentDetail()
})

const levelIconBG = ref<string>('#0089ff');
const levelToString = (level: number) => {
  const levelStr: Array<string> = ['蓝', '黄', '橙', '红'];
  const levelIconBGStr: Array<string> = ['#0089ff', '#FFFF00', '#FFA500', '#FF0000'];
  levelIconBG.value = levelIconBGStr[level]
  return levelStr[level]
}

const statusSrc = (res: number | undefined) => {
  if (typeof res === "number") {
    return new URL(`../../assets/image/claimsStatus${res}.png`, import.meta.url).href;
  }

};

const statusToStr = (level: number): string => {
  const levelStr: Array<string> = ['跟进中', '案件撤销', '关单待审核', '已结案'];
  return levelStr[level]
}

const claimsBaseDetails = ref<any>({});
const claimsDetails = ref<any>({});
const getAccidentDetail = () => {
  accidentDetail(route.query.ID).then(res => {
    res.data.details.level = levelToString(res.data.details.level)
    claimsBaseDetails.value = res.data.base;
    claimsDetails.value = res.data.details;
  })
}

</script>

<style lang="scss">
#app {
  height: unset !important;
}
</style>

<style lang="scss" scoped>
.claims_details-body {
  background-repeat: no-repeat;
  background-size: 100%;

  .claims_details-body-title {
    margin: 0 24px;
    padding-top: 90px;
    padding-bottom: 50px;
    font-size: 36px;
    color: #ffffff;

    p {
      font-size: 20px;
    }
  }

  .claims_details {
    margin: 0 24px 20px;
    padding-top: 2px;
    padding-bottom: 40px;
    border-radius: 12px;

    .claims_details_title {
      padding: 40px 30px 30px;
      font-size: 28px;
      color: #333333;
      vertical-align: unset;

      span {
        display: inline-block;
        margin-right: 20px;
        width: 30px;
        height: 30px;
        text-align: center;
        background-color: #ff9c00;
        color: #ffffff;
        font-size: 24px;
        border-radius: 4px;
      }
    }

    :deep(.van-cell) {
      padding-top: 0;
      padding-bottom: 0;
    }

    :deep(.claims_details_cell-title) {
      font-size: 24px;
      color: #666666;
    }

    :deep(.claims_details_cell-value) {
      font-size: 24px;
      color: #666666;
      text-align: left;
      font-weight: bolder;
    }

    :deep(.claims_details_cell-value.level-icon) {
      padding-left: 20px;
    }

    :deep(.claims_details_cell-value.level-icon:before) {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: v-bind("levelIconBG");
    }

    .status-icon .van-icon {
      margin-right: 20px;
      vertical-align: middle;
    }
  }
}

</style>