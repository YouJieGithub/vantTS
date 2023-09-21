<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <div class="resign">
    <div class="resign_title"><h2>离职通道</h2></div>
    <div class="resign_content">
      <h1>骑手离职补充条款</h1>
      <p>
        1、骑手离职应在店小二系统发起离职，人事、站长约谈沟通后由站长在店小二系统中审批离职申请，审批通过，两个月后可正常办理离职。<br>
        2、站长审批通过后满两个月需在 10 个工作日内办理完相关离职手续。避免因离职信息未完善导致薪资无法正常发放。<br>
        3、站长审批通过后离职骑手与正常骑手制度保持一致，因个人原因懈怠工作以及传播负面信息，针对该行为进行 1000
        元处罚，情节恶劣者扣除全部薪资并且立即解除劳务关系。<br>
        4、自离骑手站长发起自离后不计发工资。为了避免出现自离骑手跨月办理离职站长应在骑手发起自离后编辑短信告知骑手自离不计发工资。如骑手因个人原因导致站点无法联系站长应主动发出自离短信告知骑手，如骑手回复离职站长应做出旷工处罚*天数。<br>
        5、离职骑手发放薪资日期调整：因老带新以及物料问题，离职骑手发放薪资为每月25日。
      </p>
    </div>
    <div class="resign_content-submit">
      <transition name="van-fade">
        <Button v-if="[0,1].includes(status)" block round type="primary" @click="show=true">我要离职</Button>
      </transition>
    </div>
    <div class="to_resign_list">
      <router-link to="/resignlist"><span>申请记录></span></router-link>
    </div>
  </div>
  <Popup v-model:show="show" position="bottom" round safe-area-inset-bottom transition-appear>
    <Picker :columns="columns" :columns-field-names="{text:'value',value:'id'}" @cancel="show=false"
            @confirm="onConfirm"/>
  </Popup>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Button, Picker, Popup, showToast} from 'vant';
import {onBeforeMount, ref} from "vue";
import {resignSave, staffStatus, systemInform} from "@/API/login";
import {useRoute} from "vue-router";

const route=useRoute()

const show = ref<boolean>(false);
const columns = ref<any>([]);
const status = ref<number>(3);    //员工状态(0:试岗期，1:正式，2:离职中，3:已离职)

onBeforeMount(() => {
  getStaffStatus()
  systemInform().then(res => {
    columns.value = res.data.rows
  })
})

const getStaffStatus = () => {
  staffStatus().then(res => {
    status.value = res.data.status
  })
}

const onConfirm = ({selectedValues}: any) => {
  show.value = false;
  resignSave(selectedValues[0]).then(() => {
    showToast({message: '申请成功'});
    getStaffStatus()
  })
}

</script>

<style lang="scss" scoped>
.resign {
  background: url("@/assets/image/resign.png") no-repeat;
  background-size: 100% auto;

  .resign_title {
    padding: 69px 88px;

    h2 {
      padding: 10px 120px;
      font-size: 79px;
      font-weight: bolder;
      color: #ffffff;
      border: 2px solid #ffffff;
    }
  }

  .resign_content {
    margin: 0 24px;
    padding: 50px 33px 100px;
    background-color: #ffffff;
    border-radius: 16px;
    text-align: center;

    h1 {
      font-size: 36px;
      font-weight: bolder;
      color: #333333;
    }

    p {
      padding-top: 37px;
      font-size: 20px;
      text-align: left;
      color: #333333;
      white-space: pre-line;
    }
  }

  .resign_content-submit {
    margin: -42px 125px 0;
    width: 500px;

    button {
      letter-spacing: 14px;
    }
  }

  .to_resign_list {
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);

    span {
      font-size: 24px;
      color: #ee7e2b;
    }
  }
}
</style>