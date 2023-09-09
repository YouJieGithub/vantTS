<template>
  <div class="login-page">
    <div class="login">
      <img alt="登录" class="login-loginBg" src="@/assets/image/login.png"/>
      <Form :show-error-message="false" class="login-from" @failed="onFailedFrom" @submit="onSubmit">
        <div class="login-input">
          <Field
              v-model.number="username"
              :rules="[{ required: true, message: '请输入手机号' }]"
              class="login-input-field"
              maxlength="11"
              name="username"
              placeholder="请输入手机号"
              type="number"
          >
            <template #left-icon>
              <Icon class="iconfont icon-a-yonghuming_huaban1fuben31"></Icon>
              <!--              <svg aria-hidden="true" class="icon">-->
              <!--                <use xlink:href="#icon-a-yonghuming_huaban1fuben31"></use>-->
              <!--              </svg>-->
            </template>
          </Field>
        </div>
        <div class="login-input">
          <Field
              v-model="password"
              :rules="[{ required: true, message: '请输入密码' }]"
              class="login-input-field"
              name="password"
              placeholder="请输入密码"
              type="password"
          >
            <template #left-icon>
              <Icon class="iconfont icon-a-mima_huaban1fuben32"></Icon>
              <!--              <svg aria-hidden="true" class="icon">-->
              <!--                <use xlink:href="#icon-a-mima_huaban1fuben32"></use>-->
              <!--              </svg>-->
            </template>
          </Field>
        </div>
        <div class="login-input-submit">
          <Button block native-type="submit" round type="primary">登录</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref, Ref} from "vue";
import {useRouter} from "vue-router";
import {Button, Field, Form, Icon, showToast} from "vant";
import {useStore} from '@/store';
import '@/assets/font/iconfont.css'
/**
 * login 登录
 */
import {autoLogin, login} from '@/API/login';

/** EmptyReg 非空 非null 非undefined 验证
 * PhoneReg  手机号验证
 * debounce  函数防抖
 */
import {PhoneReg} from "@/utils/RegIndex/isPhone";
import {EmptyReg} from "@/utils/RegIndex/isEmpty";
import {throttle} from '@/utils'

const router = useRouter();
const store = useStore();


const pageH = window.innerHeight;
const openId = ref<any>('');
const username: Ref<number | string> = ref('');
const password: Ref<string | number> = ref('');
const onFailedFrom = (errorInfo: any) => {
  showToast({message: errorInfo.errors[0].message});
};

const onSubmit = (values: any) => {
  if (!Object.keys(values).length) return
  let username = PhoneReg.isPhone(String(values.username));
  let password = EmptyReg.isEmpty(values.password, "密码");
  if (username && !password) {
    let data = {
      telephone: values.username,
      password: values.password,
      openId: window.sessionStorage.getItem('openId')
    };
    login(data).then(res => {
      if (!!res && !!res.data.jwt) {
        window.sessionStorage.setItem('token', res.data.jwt);
        store.commit('userInfoModule/setState', res.data);
        router.replace({path: '/home'})
      }
    })
  }
};
throttle(onSubmit);

onBeforeMount(() => {
  if (!!window.location.search) {
    let code: string = window.location.search.split('&')[0].split('=')[1];
    autoLogin(code).then(res => {
      openId.value = res.data.openId;
      window.sessionStorage.setItem('openId', res.data.openId);
      if (!!res.data.jwt) {
        window.sessionStorage.setItem('token', res.data.jwt);
        store.commit('userInfoModule/setState', res.data);
        router.replace({path: '/home'})
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 29px;
  font-size: 26px;
  color: #c4c4c4;
}

.login-page {
  position: relative;
  height: 100%;
  text-align: center;
  background: url("@/assets/image/loginBG.png") no-repeat bottom;
  background-size: 100%;

  .login {
    padding-top: 115px;
    margin: 0 85px;

    .login-loginBg {
      margin-bottom: 46px;
      width: 241px;
      height: 124px;
    }

    .login-from {
      padding: 73px 50px 50px 50px;
      height: 500px - 73px - 50px;
      background-color: #ffffff;
      box-shadow: 0 4px 10px 0 #f0f0f0;
      border-radius: 36px;
    }

    .login-input {
      margin-bottom: 48px;
      background-color: #ffffff;

      .login-input-field {
        padding-top: 0;
        padding-bottom: 0;
        line-height: 76px;
        font-size: 24px;
        color: #333333;
        box-shadow: 0 4px 10px 0 #f7f7ff;
        border-radius: 40px;
        border: solid 2px #f1f1f1;
      }

      .icon {
        margin-right: 29px;
        width: 17px*1.5;
        height: 20px*1.5;
      }
    }

    .login-input-submit {
      margin-top: 88px;
    }
  }
}
</style>
