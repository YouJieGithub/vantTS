<template>
  <div v-for="(item,index) in options" class="notice_tilte">
    <Cell :title="item" :to='`regnotdetail?flag=${index}`' is-link></Cell>
  </div>
</template>

<script lang="ts" setup>
import {Cell} from 'vant';
import {reactive} from "vue";

const options = reactive<Array<string>>(['威沃科技骑手入职须知', '威沃科技机关入职须知', '威沃科技一线入职须知', '威沃科技储备干部入职须知'])
</script>

<style lang="scss" scoped>
.notice_tilte {
  padding: 24px 24px 0;

  ::v-deep(.van-cell) {
    border-radius: 12px;
  }
}

</style>