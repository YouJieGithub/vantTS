<template>
  <div class="page">
    <text class="home">123</text>
    <Button type="primary">主要按钮</Button>
    <CellGroup>
      <Cell title="单元格" value="内容" />
      <Cell title="单元格" value="内容" label="描述信息" />
    </CellGroup>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount} from "vue";
import {successApi} from "../../API/login";

onBeforeMount(() => {
  successApi().then((res) => {
    console.log(res);
  });
});
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  .home {
    width: 100%;
    height: 100%;
  }
}
</style>
