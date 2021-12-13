<template>
  <div class="home">
    <questionsinfo :questionslist="questionsList"></questionsinfo>
    <component :is="isComponent?examtime:examineeinfo" :questionslist="questionsList"/>
<!--    <examineeinfo v-if="true"></examineeinfo>-->
<!--    <examtime v-else></examtime>-->
  </div>
</template>

<script setup lang="ts">
import { Field,Picker,Cascader,Popup,Button  } from 'vant';
// import {timeStr} from '../../utils/utilstime'
import questionsinfo from './questionsinfo.vue'
import examineeinfo from './examinee.vue'
import examtime from './examtime.vue'
import {onBeforeMount, reactive, ref, toRefs} from "vue";
import {successApi} from "../../API/login";

const questionsListState = reactive({
  questionsList: {}
})
const {questionsList} = toRefs(questionsListState);
const isComponent=ref<boolean>(true)
const data:object={
  state:2    //1 是试题
}
onBeforeMount(() => {
  successApi(data).then((res) => {
    isComponent.value=parseInt(res.data.endtime)>new Date().valueOf();
    res.data.starttime=dayjs(parseInt(res.data.starttime)).format('YYYY-MM-DD HH:mm:ss');
    res.data.endtime=dayjs(parseInt(res.data.endtime)).format('YYYY-MM-DD HH:mm:ss');
    res.data.answerstart=dayjs(parseInt(res.data.answerstart)).format('YYYY-MM-DD HH:mm:ss');
    res.data.answerend=dayjs(parseInt(res.data.answerend)).format('YYYY-MM-DD HH:mm:ss');
    res.data.stateStr=res.data.state===1?'考试':'调研'
    questionsListState.questionsList = res.data;
  });
});
</script>

<style scoped lang="scss">
$C999: #999999;
$C333: #333333;
.home {
  padding: 157px 24px 0;
  background: url("src/assets/image/exam.png") no-repeat top center;
  background-size: 100%;
}
</style>
