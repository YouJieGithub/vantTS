<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

const themeVars = {
  rateIconFullColor: "#0089ff",
  sliderBarHeight: "4px",
  sliderButtonWidth: "20px",
  sliderButtonHeight: "20px",
  sliderActiveBackgroundColor: "#0089ff",
  buttonPrimaryBorderColor: "#0089ff",
  buttonPrimaryBackgroundColor: "#0089ff",
  checkboxLabelColor: "#999999",
};
</script>

<template>
  <ConfigProvider :theme-vars="themeVars" style="height: 100%">
    <router-view></router-view>
  </ConfigProvider>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif, PingFang-SC-Medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  background: #f7f7ff;
}
.bigButton {
  width: 500px;
  height: 81px !important;
  border-radius: 40px !important;
}
</style>
