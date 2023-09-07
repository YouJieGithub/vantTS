<template>
  <div class="register_success">
    <div class="register_success_icon">
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-a-zhucechenggong_huaban1fuben80"></use>
      </svg>
      <p>注册成功</p>
      <p>登录店小二系统，请及时修改密码</p>
    </div>
    <div class="register_success_user">
      <Divider>账户信息</Divider>
      <p>登录账号：{{ account }}</p>
      <p>默认密码：123456</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Divider} from 'vant';
import {useRoute} from "vue-router";
import {ref} from "vue";

//引入路由
const route = useRoute();

const account = ref<any>(route.query.name);
</script>

<style lang="scss" scoped>
.register_success {
  padding: 0 24px;
  height: 100%;
  text-align: center;
  background: #ffffff;

  .register_success_icon {
    padding-top: 112px;

    svg {
      margin: 20px auto;
      padding: 10px;
      width: 90px;
      height: 90px;
    }

    p:first-child {
      font-size: 30px;
      font-weight: bolder;
      color: #333333;
    }

    p:last-child {
      line-height: 60px;
      font-size: 24px;
      color: #999999;
    }
  }

  .register_success_user {
    text-align: left;

    p {
      margin: 0 auto;
      line-height: 40px;
      width: 300px;
      font-size: 24px;
      color: #333333;
    }

    :deep(.van-divider) {
      color: #333333;
    }
  }
}
</style>