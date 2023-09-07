<template>
  <HeadBack title="意见反馈"></HeadBack>
  <CellGroup title="请选择你想反馈的问题类型（必选）">
    <RadioGroup v-model.number="radioValue" checked-color="#ff9c00" class="radio_group">
      <Radio v-for="(item,index) in radioOptions" :name="index">
        <template #default>
          <div class="radio_default van-hairline--bottom">{{ item }}</div>
        </template>
      </Radio>
    </RadioGroup>
  </CellGroup>
  <CellGroup title="请补充详细问题和意见">
    <Field v-model.trim="feedbackVal" :autosize="{maxHeight: 200, minHeight: 100}" maxlength="200"
           placeholder="请输入不少于10个字的描述" show-word-limit
           type="textarea"></Field>
  </CellGroup>
  <div class="feedback_submit">
    <Button class="bigButton" type="primary" @click="feedbacSubmit">提交</Button>
  </div>
  <div class="to_feedback_list">
    <router-link to="/feedbacklist"><span>反馈记录></span></router-link>
  </div>
  <div class="van-safe-area-bottom"></div>
  <Overlay :show="feedbackShow">
    <div class="feedback_dialog">
      <div>
        <fontSvg :icon="'#icon-a-dengdaifankui_huaban1fuben90'"/>
      </div>
      <div>
        <p class="feedback_dialog_title">提交成功</p>
        <p class="feedback_dialog_tip">请耐心等待工作人员回复</p>
      </div>
      <div>
        <Button class="bigButton again_login" type="primary" @click="feedbackShow=false;feedbackVal='';">我知道了
        </Button>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import fontSvg from '@/components/fontSvg.vue';
import {Button, CellGroup, Field, Overlay, Radio, RadioGroup, showToast} from 'vant';
import {ref} from "vue";
import {proposalSave} from "@/API/feedback";
import {throttle} from "@/utils";

const radioOptions = ref<Array<string>>(['提问咨询', '公司政策', '店小二系统', '其他建议']);
const radioValue = ref<number>(0);
const feedbackVal = ref<string>('');

const feedbackShow = ref<boolean>(false);

const feedbacSubmit = () => {
  if (!feedbackVal.value.length) {
    showToast({message: '内容不能为空'})
  } else {
    let data = {
      type: radioValue.value,
      content: feedbackVal.value
    };
    proposalSave(data).then(res => {
      feedbackShow.value = true;
    })
  }
}
throttle(feedbacSubmit, 1000)
</script>

<style lang="scss" scoped>
.radio_group {
  padding: 0 24px;

  :deep(.van-radio__label) {
    flex: 1;

    .radio_default {
      height: 84px;
      line-height: 84px;
      font-size: 24px;
      color: #333333;
    }
  }

  :deep(.van-radio__icon) {
    font-size: 28px;
  }
}

.feedback_submit {
  margin-top: 100px;
  text-align: center;
}

.to_feedback_list {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  margin: 30px 0;
  text-align: center;

  span {
    font-size: 24px;
    color: #ee7e2b;
  }
}

.feedback_dialog {
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
  height: 460px - 60px;
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

  div:nth-of-type(2) {
    text-align: center;

    .feedback_dialog_title {
      font-size: 32px;
      font-weight: bolder;
      color: #333333;
    }

    .feedback_dialog_tip {
      font-size: 24px;
      color: #999999;
    }
  }

  div:last-child {
    width: 100%;

    .again_login {
      width: 100%;
      letter-spacing: 16px;
    }
  }
}
</style>