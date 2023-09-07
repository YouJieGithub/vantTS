<template>
  <HeadBack title="个人信息"></HeadBack>
  <CellGroup>
    <Cell center is-link label="姓名、手机号、站点等" title="基础信息" to="/base"></Cell>
    <Cell center is-link label="修改密码" title="账号安全" to="/revisepassword"></Cell>
    <Cell center is-link title="离职通道" to="/resign"></Cell>
  </CellGroup>
  <Button class="sign_out" square style="border: none;" @click="onSignOut">退出登录</Button>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Button, Cell, CellGroup, showConfirmDialog} from 'vant';
import {useRouter} from "vue-router";
import {systemlogout} from "@/API/login";
//引入路由
const router = useRouter()


//退出登录
const onSignOut = () => {
  showConfirmDialog({
    message: '确认退出？',
    confirmButtonColor: "#ff9c00"
  }).then(() => {
    systemlogout().then(() => {
      window.location.href = `${window.location.origin}${window.location.pathname}`;
      window.sessionStorage.removeItem('token');
    })
  }).catch(() => {
  });
};
</script>

<style lang="scss" scoped>
.sign_out {
  margin-top: 90px;
  width: 100%;
  color: #EB7B7B;
}
</style>