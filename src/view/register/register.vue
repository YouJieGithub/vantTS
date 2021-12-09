<template>
  <div class="register">
    <img src="src/assets/image/register.png" alt="注册" />
    <p>店小二注册</p>
  </div>
  <Form ref="registerfrom" class="register-from" :validate-first="true" :show-error-message="false" :scroll-to-error="true">
    <div>
      <Field v-model="fromData.site" readonly label="站点" placeholder="请选择站点" input-align="right" size="large" @click="showPicker = true" :rules="[{ required: true, message: '请选择站点' }]"/>
      <Field v-model="fromData.name" label="姓名" placeholder="请输入姓名" input-align="right" size="large" :rules="[{ required: true, message: '请输入姓名' }]"></Field>
      <Field v-model="fromData.IDcard" label="身份证号" placeholder="请输入身份证号" input-align="right" size="large" :rules="[{ required: true, message: '请输入身份证号' }]"></Field>
      <Field v-model="fromData.Bankcard" label="银行卡号" type="number" placeholder="请输入银行卡号" input-align="right" size="large" :rules="[{ required: true, message: '请输入银行卡号' }]"></Field>
      <Field v-model="fromData.Bankaddress" label="支行地址" placeholder="请输入支行地址，如：长庆路支行" input-align="right" size="large" :rules="[{ required: true, message: '请输入支行地址' }]"></Field>
    </div>
    <div>
      <Field v-model="fromData.information" is-link readonly label="信息来源" placeholder="请选择信息来源" input-align="right" size="large" @click="showPicker = true" :rules="[{ required: true, message: '请选择信息来源' }]"/>
      <Field v-model="fromData.telphone" type="number" label="手机号码" placeholder="请输入手机号码" input-align="right" size="large" :rules="[{ required: true, message: '请输入手机号码' }]"></Field>
      <Field v-model="fromData.smsCode" center type="number" clearable label="验证码" placeholder="请输入验证码" input-align="right" size="large" :rules="[{ required: true, message: '请输入验证码' }]">
        <template #button>
          <Button size="small" plain type="primary">获取验证码</Button>
        </template>
      </Field>
    </div>
  </Form>
  <div>
    <Field name="checkbox" class="checkbox">
      <template #input>
        <Checkbox v-model="checked" icon-size="16"
          >本人以详细阅读并同意签署<span style="color: #0089ff"
            >入职协议</span
          ></Checkbox
        >
      </template>
    </Field>
  </div>
  <Button type="primary" class="bigButton" @click="onSubmitFrom">注册</Button>
  <Popup v-model:show="showPicker" round position="bottom">
    <Picker
      :columns="columns"
      @cancel="showPicker = false"
      :allow-html="true"
      :columns-field-names="customFieldName"
      @confirm="onConfirm"
    />
  </Popup>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

interface registerFrom {
  site: string;
  name: string;
  IDcard?: string;
  Bankcard?: number;
  Bankaddress?: string;
  information?: string;
  telphone?: number;
  smsCode?: number;
}

const checked = ref<boolean>(false);
const columns = [
  {
    cityName: "浙江",
    cities: [
      {
        cityName: "杭州",
        cities: [{ cityName: "西湖区" }, { cityName: "余杭区" }],
      },
      {
        cityName: "温州",
        cities: [{ cityName: "鹿城区" }, { cityName: "瓯海区" }],
      },
    ],
  },
  {
    cityName: "福建",
    cities: [
      {
        cityName: "福州",
        cities: [{ cityName: "鼓楼区" }, { cityName: "台江区" }],
      },
      {
        cityName: "厦门",
        cities: [{ cityName: "思明区" }, { cityName: "海沧区" }],
      },
    ],
  },
];
const showPicker = ref<boolean>(false);
const fromData = reactive<registerFrom>({
  site: "",
  name: "",
});
const customFieldName = {
  text: "cityName",
  children: "cities",
};
const onConfirm = (value:any) => {
  fromData.site = value[value.length - 1].cityName;
  showPicker.value = false;
};
const registerfrom = ref<string>("");
const onSubmitFrom = () => {
  console.log(registerfrom);
};
</script>

<style scoped lang="scss">
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
