<template>
  <div class="login-page">
    <div class="login">
      <img src="src/assets/image/login.png" alt="登录" class="login-loginBg" />
      <Form @submit="onSubmit">
        <div class="login-input">
          <Field
            v-model="username"
            type="number"
            maxlength="11"
            left-icon="phone-o"
            name="username"
            placeholder="请输入手机号"
          />
        </div>
        <div class="login-input">
          <Field
            v-model="password"
            left-icon="closed-eye"
            type="password"
            name="password"
            placeholder="请输入账号密码"
          />
        </div>
        <div class="login-input-submit">
          <Button round block type="primary" native-type="submit">登录</Button>
        </div>
      </Form>
    </div>
    <div class="login-page-BG">
      <img src="src/assets/image/loginBG.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {PhoneReg} from "../../utils/RegIndex/isPhone";
import {EmptyReg} from "../../utils/RegIndex/isEmpty";

const username: Ref<number | null> = ref(null);
const password: Ref<string | number> = ref("");
let onSubmit = (values: any) => {
  let username = PhoneReg.isPhone(values.username);
  let password = EmptyReg.isEmpty(values.username, "密码");
  if (username && !password) {
    console.log("登录成功");
  }
};
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  height: 100%;
  background: #ffffff;
  .login {
    padding-top: 115px;
    margin: 0 135px;

    .login-loginBg {
      margin-bottom: 120px;
      width: 241px;
      height: 124px;
    }

    .login-input {
      margin-bottom: 48px;
      height: 80px;
      background-color: #ffffff;
      box-shadow: 0 8px 10px 0 #ebf1fa;
      border-radius: 80px;
      border: solid 2px #f1f1f1;
    }

    .login-input-submit {
      margin-top: 88px;
    }
  }
  .login-page-BG {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 116px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
