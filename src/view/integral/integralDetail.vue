<template>
  <HeadBack :title="route.meta.title"></HeadBack>
  <template v-if="!!list.length">
    <List v-model:loading="loading" :finished="finished" @load="onLoad">
      <Cell v-for="(item,index) in list" :key="index" :label="item.gmtTime" :title="item.type"
            :value="item.number<0?item.number:`+${item.number}`" center class="detail" label-class="detail_label"
            title-class="detail_title" value-class="detail_value"></Cell>
    </List>
  </template>
  <div v-else class="list_none-icon">
    <Empty :image="ListNone" description="暂无记录"></Empty>
  </div>
</template>

<script lang="ts" setup>
import {Cell, Empty, List} from 'vant';
import HeadBack from "@/components/header.vue";
import {useRoute} from "vue-router";
import {integralList} from "@/API/points";
import {onBeforeMount, reactive, ref} from "vue";

const route = useRoute()

const ListNone: any = new URL('../../assets/image/integralList.png', import.meta.url).href;

const list = ref<any>([]);

interface pageTypes {
  limit:number,
  page:number

}

const page = reactive<pageTypes>({
  limit: 10,
  page: 1
})
const total = ref<number>(0);

const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

const getIntegralList = (data: object) => {
  loading.value = true;
  integralList(data).then(res => {
    list.value = list.value.concat(res.data.rows);
    total.value = res.data.total;
    finished.value = list.value.length === total.value;
    loading.value = false;
  })
};

const onLoad = () => {
  page.page = page.page + 1;
  getIntegralList(page)
};

onBeforeMount(() => {
  getIntegralList(page)
});
</script>

<style lang="scss" scoped>
.detail {
  padding: 40px 24px;
}

:deep(.detail_title) {
  font-size: 28px;
  color: #333333;
}

:deep(.detail_value) {
  font-size: 28px;
  color: #333333;
}

:deep(.detail_label) {
  font-size: 24px;
  color: #333333;
}

.list_none-icon {
  margin-top: 100px;

  :deep(.van-empty__image) {
    width: 198px;
    height: 159px;
  }

  :deep(.van-empty__description) {
    font-size: 30px;
    color: #000000;
  }
}

</style>