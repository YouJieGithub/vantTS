<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <CellGroup class="cell_group">
    <Field v-model.trim="oldPassword" input-align="right" label="原密码" maxlength="50" placeholder="请输入原密码"
           type="password"></Field>
    <Field v-model.trim="urgentperson" input-align="right" label="新密码" maxlength="50" placeholder="请输入新密码"
           type="password"></Field>
    <Field v-model.trim="urgentpsw" input-align="right" label="确认新密码" maxlength="50" placeholder="请确认新密码"
           type="password"></Field>
  </CellGroup>
  <div class="revise_password-button">
    <Button class="bigButton" type="primary" @click="onConfirm">确认</Button>
  </div>
  <Overlay :show="againLoginDialog">
    <div class="again_login_dialog">
      <div>
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-a-xiugaimima-chenggong_huaban1fuben23"></use>
        </svg>
      </div>
      <p>修改成功</p>
      <div>
        <Button class="bigButton again_login" type="primary" @click="onAgainLogin">重新登录</Button>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Button, CellGroup, Field, Overlay, showNotify} from 'vant';
import {updatePsw} from '@/API/login';
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {throttle} from "@/utils";

const router = useRouter();
const route=useRoute()
const againLoginDialog = ref<boolean>(false);
const oldPassword = ref<string>('');
const urgentperson = ref<string>('');
const urgentpsw = ref<string>('');

const onConfirm = () => {
  if (oldPassword.value.length !== 0 && urgentperson.value.length !== 0 && urgentpsw.value.length !== 0 && urgentperson.value === urgentpsw.value) {
    let data = {
      oldPassword: oldPassword.value,
      password: urgentperson.value
    }
    updatePsw(data).then(res => {
      console.log(res)
      if (!!res) {
        againLoginDialog.value = true;
      }
    })
  } else {
    showNotify({type: 'danger', background: "#999999", message: '新密码不一致'});
  }
};
throttle(onConfirm, 1000)

const onAgainLogin = () => {
  // router.replace('login');
  window.location.href = `${window.location.origin}${window.location.pathname}`;
  window.sessionStorage.removeItem('token');
}
</script>

<style lang="scss" scoped>
.revise_password-button {
  margin-top: 88px;
  text-align: center;
}

.again_login_dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 460px - 120px;
  height: 400px - 60px;
  border-radius: 20px;
  background: #ffffff;

  div:first-child {
    margin-top: 20px;
    width: 90px;
    height: 90px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-size: 32px;
    font-weight: bolder;
    color: #333333;
  }

  div:last-child {
    width: 100%;

    .again_login {
      width: 100%;
    }
  }
}
</style>