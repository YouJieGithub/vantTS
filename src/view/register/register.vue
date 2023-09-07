<template>
  <div class="register">
    <img alt="注册" src="@/assets/image/register.png"/>
    <p>店小二注册</p>
  </div>
  <div class="form-page">
    <Form ref="registerfrom" :show-error-message="false" class="register-from" @failed="onFailedFrom"
          @submit="onSubmitFrom">
      <div>
        <Field v-model="fromData.site" :rules="[{ required: true, message: '请选择部门' }]" input-align="right" is-link
               label="部门" name="site" placeholder="请选择部门"
               readonly size="large" @click="isOnClick?showCascader = true:''"/>
        <Field v-model="fromData.name" :maxlength="50" :rules="[{ required: true, message: '请输入姓名' }]"
               input-align="right" label="姓名" name="name"
               placeholder="请输入姓名" size="large"></Field>
        <Field v-model="fromData.IDcard" :maxlength="18"
               :rules="[{ required: true,validator:(val)=>!IDcardReg.isIDCard(val)?'身份证号格式不正确':'',message: '请输入身份证号' }]"
               input-align="right" label="身份证号"
               name="IDcard" placeholder="请输入身份证号"
               size="large"></Field>
        <Field v-model="fromData.homeTown" :rules="[{ required: true, message: '请选择身份证地址(省市区)' }]"
               input-align="right" is-link label="身份证地址" name="homeTown" placeholder="请选择身份证地址(省市区)"
               readonly
               size="large" @click="isShowPopupArea=true;"></Field>
        <Field v-model="fromData.Bankcard" :maxlength="19"
               :rules="[{ required: true,validator:()=>!isAccountbank?'银行卡号格式不正确':'',message: '请输入银行卡号' }]"
               input-align="right" label="银行卡号"
               name="Bankcard" placeholder="请输入银行卡号" size="large" type="number" @blur="onBlurBankCard"></Field>
        <Field v-show="isAccountbank" v-model="fromData.Bankaccount" input-align="right" label="开户行"
               name="Bankaccount"
               readonly size="large"></Field>
        <Field v-model="fromData.Bankaddress" :maxlength="50" :rules="[{ required: true, message: '请输入支行地址' }]"
               input-align="right"
               label="支行地址" name="Bankaddress" placeholder="请输入支行地址，如：长庆路支行"
               size="large"></Field>
      </div>
      <div>
        <!--        <Field v-model="fromData.information" :rules="[{ required: true, message: '请选择信息来源' }]" input-align="right"-->
        <!--               is-link label="信息来源" name="information"-->
        <!--               placeholder="请选择信息来源" readonly size="large"-->
        <!--               @click="showPicker = true"/>-->
        <!--        <Field v-model="fromData.referrer" input-align="right" label="推荐人" name="referrer" placeholder="请输入推荐人"-->
        <!--               size="large"/>-->
        <Field v-model="fromData.telphone" :maxlength="13" :rules="[{ required: true,message: '请输入手机号码' }]"
               input-align="right" label="手机号码"
               name="telphone"
               placeholder="请输入手机号码" size="large" type="number"></Field>
        <Field v-model="fromData.smsCode" :maxlength="6" :rules="[{ required: true, message: '请输入验证码' }]" center
               clearable input-align="right" label="验证码"
               name="smsCode" placeholder="请输入验证码" size="large" type="number">
          <template #button>
            <Button :disabled="smsCodeDisabled" plain size="small" type="primary" @click="getSmsCode">{{ smsText }}
            </Button>
          </template>
        </Field>
      </div>
      <div>
        <Field :rules="[{ required: true, message: '请勾选入职协议' }]" class="checkbox" name="checkbox">
          <template #input>
            <Checkbox v-model="fromData.checked" icon-size="16"
            >本人以详细阅读并同意签署
              <router-link to="registernotice"><span style="color: #0089ff"
              >入职协议</span></router-link>
            </Checkbox>
          </template>
        </Field>
      </div>
      <Button class="bigButton" native-type="submit" type="primary">注册</Button>
    </Form>
  </div>
  <div class="van-safe-area-bottom"></div>
  <Popup v-model:show="showCascader" position="bottom" round safe-area-inset-bottom transition-appear>
    <Cascader
        :field-names="{ text: 'depName',value:'id',children:'children'}"
        :options="options"
        :value="siteID"
        active-color="#ff9c00"
        placeholder="请选择部门"
        @close="showCascader = false"
        @finish="onFinish"
    />
  </Popup>
  <AreaPage :isShowPopupArea="isShowPopupArea" @areaCancel="isShowPopupArea=false;"
            @areaConfirm="areaConfirm"></AreaPage>
  <!--  <Popup v-model:show="homeTownPopup" position="bottom" round safe-area-inset-bottom transition-appear>-->
  <!--    <Area :area-list="areaList" value="110101" @cancel="homeTownPopup=false" @confirm="onHomeTownConfirm"/>-->
  <!--  </Popup>-->
  <!--  <Popup v-model:show="showPicker" position="bottom" round safe-area-inset-bottom transition-appear>-->
  <!--    <Picker-->
  <!--        :columns="columns"-->
  <!--        :columns-field-names="{-->
  <!--          text:'value'-->
  <!--        }"-->
  <!--        @cancel="showPicker=false"-->
  <!--        @confirm="onConfirm"/>-->
  <!--  </Popup>-->
</template>

<script lang="ts" setup>
import AreaPage from '@/components/areaPage.vue';
import {onBeforeMount, reactive, ref} from "vue";
import {Button, Cascader, Checkbox, Field, Form, Popup, showToast} from "vant";
import md5 from 'md5'
/**
 * register 注册
 * smsCode 发送验证码
 */
import {register, smsCode} from '@/API/login';

/** EmptyReg 非空 非null 非undefined 验证
 * IDcardReg 身份证号验证
 * PhoneReg  手机号验证
 * BankReg   银行卡正则验证
 */
import {IDcardReg} from '@/utils/RegIndex/isIDcard';
import {PhoneReg} from '@/utils/RegIndex/isPhone';

/**
 * departmentList  查询所有未禁用的部门列表
 * systemInform    查询所有信息来源列表
 * departmentName  根据部门Id查询部门名称
 */
import {departmentList, departmentName} from '@/API/department';
// import {systemInform} from '@/API/infosource';
import {bankInfo} from '@/API/bank';
import {useRoute, useRouter} from "vue-router";
import {throttle} from "@/utils";


interface registerFrom {
  site: string;
  name: string;
  IDcard: string;
  homeTown: string;
  Bankcard: number | string;
  Bankprovince?: string;
  Bankaddress: string;
  Bankaccount: string;
  // information: string | number | undefined;
  // referrer: string;
  telphone: string | number;
  smsCode: string;
  checked: boolean;
}

//引入路由
const router = useRouter();
const route = useRoute();

//级联选择器的value
const isOnClick = ref<boolean>(true);   //扫码后不能打开级联选择器  true 可打开 false 不可打开
const options = ref<Array<object>>();
const showCascader = ref<boolean>(false);


const columns = ref<Array<object>>([]);
const showPicker = ref<boolean>(false);

const checked = ref<boolean>(false);


//from表单
const registerfrom = ref<string>("");
const fromData = reactive<registerFrom>({
  site: '',
  name: '',
  IDcard: '',
  homeTown: '',
  Bankcard: '',
  Bankaddress: '',
  Bankaccount: '',
  // information: '',
  // referrer: '',
  telphone: '',
  smsCode: '',
  checked: false
});
const isShowPopupArea = ref<boolean>(false);  //isShow 省市区
const siteID = ref<number | string>('');    //部门ID
const Bankprovince = ref<string>('');     //银行卡所属省份
// const information = ref<number | null>(null); //信息来源ID


const isAccountbank = ref<boolean>(false);    //isShow 开户行
const onBlurBankCard = () => {
  if (!!fromData.Bankcard) {
    let data = {
      bankCardNumber: fromData.Bankcard
    }
    bankInfo(data).then(res => {
      if (!res) {
        isAccountbank.value = false;
        return '银行卡格式不正确';
      } else {
        fromData.Bankaccount = res.data.bank;
        Bankprovince.value = res.data.province;
        isAccountbank.value = true;
      }
    })
  }
}

//省市区转换字符串
const areaConfirm = (r: any) => {
  fromData.homeTown = r;
  isShowPopupArea.value = false;
}
// const onHomeTownConfirm = (result: Array<object>) => {
//   let IdAddress: string = result.map((res: any) => {
//     return res.name
//   }).join('');
//   fromData.homeTown = IdAddress;
//   homeTownPopup.value = false;
// }

//发送验证码
const smsCodeDisabled = ref<boolean>(false);
const smsText = ref<string>('获取验证码');
const getSmsCode = () => {
  if (PhoneReg.isPhone(String(fromData.telphone)) && !smsCodeDisabled.value) {
    let data = {
      telephone: fromData.telphone,
      encrypt: md5(md5(`${fromData.telphone}vvkj`))
    }
    smsCode(data).then(() => {
      // showNotify({type: 'primary', message: '已发送'});
      showToast({message: '已发送'});
      smsCountdown(59)
    })
  }
};
const smsCountdown = (time: number) => {
  setTimeout(() => {
    if (time > 0) {
      smsText.value = `倒计时${time--}S`
      smsCodeDisabled.value = true;
      smsCountdown(time)
    } else {
      smsText.value = `发送验证码`
      smsCodeDisabled.value = false;
    }
  }, 1000)
}

/**
 * getDepartmentList 请求后台部门数据
 * onFinish 获取全部选项数据
 */
const getDepartmentList = () => {
  departmentList().then((res: any) => {
    options.value = res.data.rows;
  })
};
const onFinish = (value: any) => {
  fromData.site = value.selectedOptions[value.tabIndex].depName;
  siteID.value = value.value;
  showCascader.value = false;
};

/**
 *  getSystemInform 来源信息后台数据
 *  onConfirm 选择来源信息
 */
// const getSystemInform = (data: string) => {
//   systemInform(data).then((res: any) => {
//     columns.value = res.data.rows;
//   })
// };
// const onConfirm = (value: any) => {
//   fromData.information = value.value;
//   information.value = value.id;
//   showPicker.value = false;
// }

/**
 * onSubmitFrom 提交表单
 */
const onSubmitFrom = (values: any) => {
  let data = {
    staffName: values.name,
    departmentId: siteID.value,
    identityNumber: values.IDcard,
    bankCardNumber: values.Bankcard,
    bankAccount: values.Bankaccount,
    bankProvince: Bankprovince.value,
    bankAddress: values.Bankaddress,
    homeTown: values.homeTown,
    // referrer: values.referrer,
    // informId: information.value,
    telephone: values.telphone,
    checkCode: values.smsCode
  };
  register(data).then(res => {
    if (!!res) {
      router.replace({path: '/registerSuccess', query: {name: values.telphone}})
    }
  })
};

throttle(onSubmitFrom, 1000)

const onFailedFrom = (errorInfo: any) => {
  // showNotify({type: "danger", background: '#999999', message: errorInfo.errors[0].message});
  showToast({message: errorInfo.errors[0].message});
};

onBeforeMount(() => {
  if (JSON.stringify(route.query) !== '{}') {
    let routeOptions: any = route.query;
    departmentName(routeOptions.depId).then(res => {
      fromData.site = res.data.name;
      siteID.value = routeOptions.depId;
    })
    isOnClick.value = false;
  }
  getDepartmentList();
  // getSystemInform('inform');
})
</script>

<style lang="scss" scoped>
.form-page {
  padding-bottom: 94px;
  text-align: center;
  background: #f7f7ff;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 250px;
  background-color: #f7f7ff;

  img {
    width: 154px;
    height: 79px;
  }

  p {
    margin-top: 20px;
    font-size: 28px;
    line-height: 28px;
  }
}

.register-from {
  > div {
    margin-bottom: 20px;
    font-size: 24px;
  }
}

.checkbox {
  font-size: 20px;
  background-color: #f7f7ff;
  color: #999999;
}
</style>
