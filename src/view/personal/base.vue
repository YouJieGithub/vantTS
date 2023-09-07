<template>
  <HeadBack title="基础信息"></HeadBack>
  <div class="base-page">
    <Form :show-error-message="false" validate-first @failed="onFailed" @submit="onSubmit">
      <CellGroup class="cell_group">
        <Field v-model="final.staffName" :rules="[{ required: true, message: '请输入姓名' }]" input-align="right"
               label="姓名"
               label-width="50%"
               maxlength="50" name="staffName" placeholder="请输入姓名"></Field>
        <Field v-model="final.telephone" input-align="right" label="手机号码" readonly></Field>
        <Field v-model="final.departmentName" input-align="right" label="部门" readonly></Field>
        <Field v-model="final.positionName" input-align="right" label="职位" readonly></Field>
        <Field v-model="final.jobNumber" input-align="right" label="工号" readonly></Field>
        <Field v-model="final.mtNumber" input-align="right" label="美团ID" readonly></Field>
        <Field v-model="final.entryDate" input-align="right" label="入职日期" readonly></Field>
        <Field v-model="final.identityNumber" input-align="right" label="身份证号" readonly></Field>
      </CellGroup>
      <CellGroup class="cell_group">
        <Field v-model="update.homeTown" :rules="[{ required:false, message: '请选择身份证地址' }]" input-align="right"
               is-link
               label="身份证地址"
               label-width="25%" maxlength="50" name="homeTown" placeholder="请选择身份证地址" readonly
               @click="isShowPopupArea=true;"></Field>
        <Field v-model="update.folk" :rules="[{ required: false, message: '请选择民族' }]" input-align="right" is-link
               label="民族" name="folk" placeholder="请选择民族"
               readonly
               @click="onShowPopup(1,nationality.indexOf(update.folk))"></Field>
        <Field v-model="marriage[update.maritalStatus]" :rules="[{ required: false, message: '请选择婚姻状况' }]"
               input-align="right" is-link label="婚姻状况"
               name="maritalStatus" placeholder="请选择婚姻状况" readonly
               @click="onShowPopup(2,update.maritalStatus)"></Field>
        <Field v-model="update.address" :rules="[{ required: false, message: '请输入现住址' }]" input-align="right"
               label="现住址" label-width="50%" maxlength="50"
               name="address" placeholder="请输入现住址" type="textarea"></Field>
        <Field v-model="education[update.education]" :rules="[{ required: false, message: '请输入现住址' }]"
               input-align="right" is-link label="学历" name="education"
               placeholder="请选择学历" readonly
               @click="onShowPopup(3,update.education)"></Field>
        <Field v-model="update.graduateSchool" :rules="[{ required: false, message: '请输入毕业院校' }]"
               input-align="right"
               label="毕业院校" maxlength="50"
               name="graduateSchool" placeholder="请输入毕业院校"></Field>
        <Field v-model="update.graduateDate" :rules="[{ required: false, message: '请选择毕业时间' }]"
               input-align="right"
               is-link label="毕业时间" name="graduateDate"
               placeholder="请选择毕业时间" readonly @click="isShowDate=true"></Field>
      </CellGroup>
      <CellGroup class="cell_group">
        <Field v-model="update.urgentContact" :rules="[{ required: false, message: '请输入紧急联系人' }]"
               input-align="right"
               label="紧急联系人" maxlength="50"
               name="urgentContact" placeholder="请输入紧急联系人"></Field>
        <Field v-model="update.urgentContactTel"
               :rules="[{ required: false,validator:(val)=>!!val&&!PhoneReg.isPhone(val)?'手机号格式不正确':'', message: '请输入紧急联系人电话' }]"
               input-align="right" label="紧急联系人电话" label-width="50%"
               maxlength="11" name="urgentContactTel" placeholder="请输入紧急联系人电话"
               type="number"></Field>
      </CellGroup>
      <div class="save_revise_button">
        <Button class="bigButton" native-type="submit" type="primary">保存修改</Button>
      </div>
    </Form>
  </div>
  <Popup v-model:show="isShowPopup" position="bottom" round safe-area-inset-bottom transition-appear>
    <Picker v-model="defaultIndex" :columns="columns" @cancel="isShowPopup=false" @confirm="onConfirm"/>
  </Popup>
  <Popup v-model:show="isShowDate" position="bottom" round safe-area-inset-bottom transition-appear>
    <DatePicker :formatter="formatterDate" :max-date="maxDate" :min-date="minDate" @cancel="isShowDate=false;"
                @confirm="onConfirmDate"/>
  </Popup>
  <AreaPage :isShowPopupArea="isShowPopupArea" @areaCancel="isShowPopupArea=false;"
            @areaConfirm="areaConfirm"></AreaPage>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import AreaPage from '@/components/areaPage.vue';
import {Button, CellGroup, DatePicker, Field, Form, Picker, PickerOption, Popup, showToast} from 'vant';
import {onBeforeMount, ref} from "vue";
import {baseDetail, baseUpdate} from "@/API/baseinfo";
import dayjs from "dayjs";

/**
 * PhoneReg  手机号验证
 */
import {PhoneReg} from "@/utils/RegIndex/isPhone";
import {throttle} from "@/utils";

const final = ref<any>({});
const update = ref<any>({});


// const currentaddress=ref<string>('1445145445544541454517515475154515')
const minDate = new Date(1980, 1, 1);
const maxDate = new Date();
const columns = ref<any>([]);
const FieldFlag = ref<number>(0);
const defaultIndex = ref<Array<number | string>>([]);
const nationality = ref<Array<string>>(["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"]);
const marriage = ref<Array<string>>(['未婚', '已婚', '离异']);
const education = ref<Array<string>>(['初中及以下', '高中', '大专', '本科', '硕士及以上']);
const isShowPopup = ref<boolean>(false);
const isShowDate = ref<boolean>(false);
const isShowPopupArea = ref<boolean>(false);
const onShowPopup = (flag: number, index: number | string) => {
  //1 民族 2 婚姻状况 3 学历
  isShowPopup.value = true;
  defaultIndex.value = [index];
  FieldFlag.value = flag;
  switch (flag) {
    case 1:
      columns.value = nationality.value.map((r, i) => {
        return {text: r, value: i}
      });
      break;
    case 2:
      columns.value = marriage.value.map((r, i) => {
        return {text: r, value: i}
      });

      break;
    case 3:
      columns.value = education.value.map((r, i) => {
        return {text: r, value: i}
      });
      break;
  }
};

const onConfirmDate = ({selectedValues}: any) => {
  let value: string = selectedValues.join('-');
  update.value.graduateDate = dayjs(value).format('YYYY-MM-DD');
  isShowDate.value = false;
};

const onConfirm = ({selectedOptions}: any) => {
  //1 民族 2 婚姻状况 3 学历
  switch (FieldFlag.value) {
    case 1:
      update.value.folk = selectedOptions[0].text;
      break;
    case 2:
      update.value.maritalStatus = marriage.value.indexOf(selectedOptions[0].text);
      break;
    case 3:
      update.value.education = education.value.indexOf(selectedOptions[0].text);
      break;
  }
  isShowPopup.value = false;
};

const areaConfirm = (r: any) => {
  update.value.homeTown = r;
  isShowPopupArea.value = false;
};

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

const onSubmit = (value: any) => {
  let data = {
    name: value.staffName,
    maritalStatus: update.value.maritalStatus,
    folk: value.folk,
    homeTown: value.homeTown,
    address: value.address,
    education: update.value.education,
    graduateSchool: value.graduateSchool,
    graduateDate: value.graduateDate,
    urgentContact: value.urgentContact,
    urgentContactTel: value.urgentContactTel
  };
  baseUpdate(data).then(res => {
    showToast({message: res.message});
  })
};
throttle(onSubmit, 1000)

const onFailed = (errorInfo: any) => {
  showToast({message: errorInfo.errors[0].message});
};

onBeforeMount(() => {
  baseDetail().then(res => {
    final.value = res.data.final;
    update.value = res.data.update;
  })
})
</script>

<style lang="scss" scoped>
.base-page {
  background: #f7f7ff;
}

.cell_group {
  margin-bottom: 20px;
}

.save_revise_button {
  padding: 60px 0;
  text-align: center;
}
</style>