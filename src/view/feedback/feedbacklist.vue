<template>
  <HeadBack title="反馈记录"></HeadBack>
  <List v-model:loading="loading" :finished="finished" :immediate-check="false"
        class="personnel-page" @load="onLoad">
    <div v-for="item in list" :key="item.id" class="feedback">
      <Cell :title="'反馈类型：'+feedbackType[item.type]" :value="item.gmtCreate" class="feedback_cell"
            title-class="cell-title-class"
            value-class="value-class"></Cell>
      <div class="feedback_list van-cell">
        <p><span>反馈详情：</span>{{ item.content }}</p>
      </div>
      <div v-if="item.status===1">
        <div class="feedback_list">
          <p><span>处理内容：</span>{{ item.reply }}</p>
        </div>
        <div class="feedback_list_time"><p class="value-class">{{ item.replyTime }}</p></div>
      </div>
    </div>
  </List>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Cell, List} from 'vant';
import {proposalList} from "@/API/feedback";
import {onBeforeMount, ref} from "vue";

const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const finishedText = ref<string>('');

const page = ref<number>(1);
const limit = ref<number>(10);

const list = ref<Array<any>>([]);
const total = ref<number>(0);

const feedbackType = ref<Array<string>>(['提问咨询', '公司政策', '店小二系统', '其他建议'])

const onLoad = () => {
  page.value += 1;
  getProposalList();
};

const getProposalList = () => {
  loading.value = true;
  proposalList(page.value, limit.value).then(res => {
    total.value = res.data.total;
    list.value = res.data.rows;
    loading.value = false;
    if (list.value.length < total.value) {
      finished.value = false;
      finishedText.value = '上拉加载更多';
    } else {
      finished.value = true;
      finishedText.value = '没有更多了';
    }
  })
}
onBeforeMount(() => {
  getProposalList()
})
</script>

<style lang="scss" scoped>
.personnel-page {
  background: #f7f7ff;
}

.feedback {
  margin: 20px 24px;

  .feedback_cell {
    border-radius: 24px 24px 0 0;
  }

  :deep(.cell-title-class) {
    font-size: 24px;
    color: #333333;
  }

  :deep(.value-class) {
    font-size: 20px;
    color: #999999;
  }

  .feedback_list {
    padding: 30px;
    border-radius: 0 0 24px 24px;

    p {
      line-height: 42px;
      font-size: 24px;
      color: #999999;
      word-break: break-all;

      span {
        color: #333333;
      }
    }
  }

  .feedback_list_time {
    padding: 0 30px 30px;
    text-align: right;
  }
}
</style>