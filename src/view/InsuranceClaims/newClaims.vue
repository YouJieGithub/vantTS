<template>
  <HeadBack title="我要报案"></HeadBack>
  <div class="VanImage">
    <VanImage :src="GuidelinesGuideImg" fit="contain"/>
  </div>
  <Form :show-error-message="false" class="new-claims-from" input-align="right" validate-first
        validate-trigger="onSubmit" @failed="onFailed" @submit="onSubmit">
    <CellGroup :border="false" class="cell_group">
      <div class="Form-card-title">基础信息<span>（请务必填写能联系到骑手本人的手机号码）</span></div>
      <Field v-model="formData.username" label="骑手姓名" label-class="cell_group_label" name="username" readonly/>
      <Field v-model="formData.telephone" :maxlength="11" :rules="[{ required: true,message: '请输入手机号码'}]" is-link
             label="手机号码"
             label-class="cell_group_label"
             name="telephone" placeholder="请输入手机号码"/>
      <Field v-model="formData.cardID" label="身份证号码" label-class="cell_group_label" name="cardID" readonly/>
    </CellGroup>
    <CellGroup :border="false" class="cell_group">
      <div class="Form-card-title">案情信息<span>（必填）</span></div>
      <Field v-model="formData.eventTime" :rules="[{ required: true, message: '请选择事发时间' }]" is-link
             label="事发时间"
             label-class="cell_group_label"
             name="eventTime" placeholder="请选择事发时间" readonly @click="isShow=true"/>
      <Field v-model="formData.eventPlace" :maxlength="200" :rules="[{ required: true, message: '请输入事发地点' }]"
             autosize
             is-link
             label="事发地点" label-class="cell_group_label"
             name="eventPlace"
             placeholder="请输入事发地点" type="textarea"/>
      <Field v-model="formData.eventDesc" :maxlength="500" :rules="[{ required: true, message: '请输入事发经过' }]"
             autosize
             is-link
             label="事发经过" label-class="cell_group_label"
             name="eventDesc"
             placeholder="请输入事发经过" type="textarea"/>
    </CellGroup>
    <div class="new_from_button">
      <Button block native-type="submit" round type="primary">确认提交</Button>
    </div>
  </Form>
  <Popup v-model:show="isShow" close-on-popstate position="bottom" round safe-area-inset-bottom>
    <PickerGroup :tabs="['选择日期', '选择时间']" class="picker-group-date" title="选择事发时间" @cancel="isShow=false"
                 @confirm="currentDateConfirm">
      <DatePicker v-model="currentDate" :formatter="formatterDate" :max-date="maxData" :min-date="minDate"/>
      <TimePicker v-model="currentTime" :columnsType="['hour','minute','second']" :formatter="formatterTime"
                  :min-hour="minHour" :min-minute="minMinute" :min-second="minSecond"></TimePicker>
    </PickerGroup>
  </Popup>
  <Popup :show="IsSuccessfulIcon" close-on-popstate round>
    <div class="successful_operation">
      <VanImage :src="successfulIcon" class="successful_icon"></VanImage>
      <div>
        <p>报案成功</p>
        <p>请耐心等待工作人员回复</p>
      </div>
      <Button block native-type="submit" round type="primary" @click="router.back()">我 知 道 了</Button>
    </div>
  </Popup>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import type {PickerOption} from 'vant';
import {
  Button,
  CellGroup,
  DatePicker,
  Field,
  Form,
  Image as VanImage,
  PickerGroup,
  Popup,
  showToast,
  TimePicker
} from 'vant';
import {onBeforeMount, reactive, ref} from "vue";
import dayjs from "dayjs";
import arraySupport from 'dayjs/plugin/arraySupport';
/**
 * PhoneReg  手机号验证
 */
import {PhoneReg} from '@/utils/RegIndex/isPhone';
import {accidentSave, personBase} from "@/API/InsuranceClaims";
import {useRouter} from "vue-router";

dayjs.extend(arraySupport);

const router = useRouter()

const GuidelinesGuideImg: any = new URL('../../assets/image/newClaimsBG.png', import.meta.url).href;
const successfulIcon: any = new URL('../../assets/image/successfulIcon.png', import.meta.url).href;

const IsSuccessfulIcon = ref<boolean>(false);

const isShow = ref<boolean>(false)
const minDate: Date = new Date(2018, 1, 1);
const maxData: Date = new Date();
const minHour: string = dayjs().format('HH');
const minMinute: string = dayjs().format('mm');
const minSecond: string = dayjs().format('ss');
const formatterDate = (type: string, option: PickerOption) => {
  switch (type) {
    case 'year':
      option.text = `${option.text}年`
      break;
    case 'month':
      option.text = `${option.text}月`
      break;
    case 'day':
      option.text = `${option.text}日`
      break;
  }
  return option;
};

const formatterTime = (type: string, option: PickerOption) => {
  switch (type) {
    case 'hour':
      option.text = `${option.text}时`
      break;
    case 'minute':
      option.text = `${option.text}分`
      break;
    case 'second':
      option.text = `${option.text}秒`
      break;
  }
  return option;
}

const currentDate = ref<string[]>(dayjs().format('YYYY-M-D').split('-'))
const currentTime = ref<string[]>(dayjs().format('HH-mm-ss').split('-'))
const onCancel = () => {

}
const currentDateConfirm = (value: any) => {
  formData.eventTime = `${value[0].selectedValues.join('-')} ${value[1].selectedValues.join(':')}`
  isShow.value = false;
}


interface formDataType {
  username: string,
  telephone: string,
  cardID: string,
  eventTime: any,
  eventPlace: string,
  eventDesc: string
}

const formData = reactive<formDataType>({
  username: '',
  telephone: '',
  cardID: '',
  eventTime: '',
  eventPlace: '',
  eventDesc: ''
})

formData.eventTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

const staffId = ref<number | string>('');

const onFailed = (errorInfo: { errors: any }) => {
  showToast({message: errorInfo.errors[0].message});
}

const onSubmit = (value: any) => {
  if (PhoneReg.isPhone(String(value.telephone))) {
    setAccidentSave(value)
  }
}

onBeforeMount(() => {
  getPersonBase()
})

const getPersonBase = () => {
  personBase().then(res => {
    staffId.value = res.data.base.staffId;
    formData.username = res.data.base.staffName;
    formData.telephone = res.data.base.telephone;
    formData.cardID = res.data.base.identityNumber;
  })
}

const setAccidentSave = (value: any) => {
  const data: object = {
    staffId: staffId.value,
    telephone: value.telephone,
    eventTime: value.eventTime,
    eventPlace: value.eventPlace,
    eventDesc: value.eventDesc
  }
  accidentSave(data).then(() => {
    IsSuccessfulIcon.value = true;
  })
}

</script>

<style>
#app {
  height: 100%;
}
</style>


<style lang="scss" scoped>
$color: #ff9c00;
.VanImage {
  width: 100%;
  height: 220px;
}

.new-claims-from {
  height: 100%;
  background: #f1f1f1;

  .cell_group {
    padding: 36px 24px 0;
  }

  .cell_group:first-child {
    margin-bottom: 20px;
  }

  :deep(.van-cell__right-icon) {
    font-size: 20px;
  }

  :deep(.cell_group_label) {
    font-size: 26px;
  }

  :deep(.van-field__value) {
    font-size: 26px;
  }

  .Form-card-title {
    padding-left: 27px;
    position: relative;
    line-height: 54px;
    font-weight: bolder;
    font-size: 28px;
    color: #333333;

    span {
      font-size: 24px;
      color: #333333;
    }
  }

  .Form-card-title:before {
    position: absolute;
    content: '';
    width: 6px;
    height: 28px;
    background-color: $color;
    border-radius: 3px;
    top: 25%;
    left: 0;
    transform: translateY(calc(-25% + 6px));
  }

  .new_from_button {
    padding: 80px 16px 16px;
    background: #f1f1f1;

    button {
      margin: 0 auto;
      width: 500px;
      height: 80px;
      box-shadow: 0 8px 19px 1px #aebfd9;
      border-radius: 40px;

    }
  }

}

.successful_operation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 340px;
  height: 400px;
  padding: 20px 40px;
  text-align: center;

  .successful_icon {
    width: 90px;
  }

  p:first-child {
    font-size: 32px;
    color: #000000;
    font-weight: bolder;
  }

  p:last-child {
    font-size: 20px;
    color: #c8c9cc;
  }
}

.picker-group-date {
  :deep(.van-tab--active) {
    color: $color;
  }

  :deep(.van-tabs__line) {
    background: $color;
  }
}
</style>