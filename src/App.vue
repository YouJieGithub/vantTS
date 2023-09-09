<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ConfigProvider} from 'vant';
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const includeList = ref<Array<string>>([])
router.beforeResolve((to, from) => {
  if (to.name === 'singleanalyze' && from.name === 'singledetail' || to.name === 'singledetail' && from.name === 'singleanalyze') {
    includeList.value = ['singledetail'];
  } else {
    includeList.value = [];
  }
})


const $333 = '#333333';
const $999 = '#999999';

const themeVars = {
  rateIconFullColor: "#0089ff",
  sliderBarHeight: "4px",
  sliderButtonWidth: "20px",
  sliderButtonHeight: "20px",
  sliderActiveBackgroundColor: "#0089ff",
  ButtonDefaultHeight: '40px',
  buttonPrimaryBorderColor: "#0089ff",
  buttonPrimaryBackgroundColor: "#0089ff",
  checkboxLabelColor: $999,
  navBarBackgroundColor: '#f7f7ff',
  navBarTitleTextColor: $333,
  navBarIconColor: $999,
  searchContentBackgroundColor: '#ffffff',
  tabActiveTextColor: '#0089ff',
  tabsBottomBarColor: '#0089ff',
  cellLabelColor: $999,
  cellTextColor: $333,
  fieldLabelColor: $333,
  fieldInputTextColor: $333,
  BadgeDotSize: '4px',
  ButtonPrimaryBackground: '#ff9c00',
  ButtonPrimaryBorderColor: '#ff9c00',
  PickerConfirmActionColor: '#ff9c00'
};
</script>

<template>
  <ConfigProvider :theme-vars="themeVars" style="height: 100%">
    <router-view v-slot="{Component }">
      <Transition name="van-fade">
        <keep-alive :include="includeList">
          <component :is="Component"></component>
        </keep-alive>
      </Transition>
    </router-view>
  </ConfigProvider>
</template>

<style>
html, body {
  background: #f7f7ff;
}

#app {
  width: 100%;
  height: 100%;
  /*font-family: Avenir, Helvetica, Arial, sans-serif, PingFang-SC-Medium;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  color: #333333;
}

.bigButton {
  width: 500px;
  height: 81px !important;
  border-radius: 40px !important;
}

.setDefaultNotify {
  line-height: 20px !important;
}


#nprogress .bar {
  background: #ff9c00 !important;
}

#nprogress .spinner-icon {
  border-top-color: #ff9c00 !important;
  border-left-color: #ff9c00 !important;
}
</style>
