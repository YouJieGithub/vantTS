<template>
  <HeadBack title="理赔流程"></HeadBack>
  <div class="Insurance-img">
    <img alt="保险理赔" src="@/assets/image/Insurance.png">
  </div>
  <div class="Insurance_select" @click="showPopup">
    <div class="Insurance_select_title">项目名称：</div>
    <div class="Insurance_select_value">
      <div>{{ cellValue.value }}</div>
      <Icon name="arrow-down"/>
    </div>
  </div>
  <Popup v-model:show="show" position="bottom" round safe-area-inset-bottom>
    <Picker :columns="columns" :columns-field-names="{ text: 'text', value: 'value'}" @cancel="onCancel"
            @confirm="onConfirm"></Picker>
  </Popup>
  <div class="Insurance_body">
    <InsuranceGuide v-if="[1,3].includes(cellValue.index)" :isView="cellValue.index"></InsuranceGuide>
    <InsuranceRelation v-else :isView="cellValue.index" @InsuranceBodyH="InsuranceBodyH"></InsuranceRelation>
  </div>
  <div class="Insurance_bottom">
    <div class="Insurance_bottom_content">
      <p>本页面仅供参考，如需了解更多详情</p>
      <p>请联系：400-661-6626</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import type {PickerOption} from 'vant';
import {Icon, Picker, Popup} from 'vant';
import {ref, shallowReactive} from "vue";
import InsuranceGuide from './InsuranceGuide.vue';
import InsuranceRelation from './InsuranceRelation.vue';

interface cellValueT {
  value: string,
  index: number
}

const cellValue: cellValueT = shallowReactive({
  value: '人伤事故赔偿关系图',
  index: 0
});

const show = ref<boolean>(false);
const showPopup = () => {
  show.value = true;
};


const onCancel = () => show.value = false;
const columns: PickerOption[] = [{value: 0, text: '人伤事故赔偿关系图'}, {
  value: 1,
  text: '人伤事故场景与指引'
}, {value: 2, text: '物损事故赔偿关系图'}, {value: 3, text: '物损事故场景与指引'}];
const InsuranceHstyle = ref<string | undefined>('calc(100% - 110px - 100px - 70px)');
const onConfirm = ({selectedOptions}: any) => {
  cellValue.value = selectedOptions[0].text;
  cellValue.index = selectedOptions[0].value;
  InsuranceHstyle.value = [0, 2].includes(selectedOptions[0].value) ? 'calc(100% - 110px - 100px - 70px)' : 'auto';
  show.value = false;
};

const InsuranceBodyH = (val: string | undefined) => {
  InsuranceHstyle.value = val;
}
</script>

<style lang="scss" scoped>
.Insurance-img {
  width: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.Insurance_select {
  padding: 35px 24px;
  display: flex;
  align-items: center;
  height: 70px;
  line-height: 70px;
  background: #f7f7ff;

  .Insurance_select_title {
    flex: 1;
    font-size: 24px;
    color: #333333;
  }

  .Insurance_select_value {
    padding: 0 21px;
    flex: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    font-size: 24px;
    color: #666666;
  }
}

.Insurance_body {
  padding-bottom: 110px;
  height: v-bind(InsuranceHstyle);
}

.Insurance_bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #f7f7ff;
  text-align: center;

  .Insurance_bottom_content {
    padding: 24px 0;

    p {
      font-size: 24px;
      color: #999999;
    }
  }
}
</style>