<template>
  <div class="insurance_relation">
    <VanImage v-if="isView===0" :src="InsuranceRelation_personnelImg" fit="contain" @load="ImageLoad">
      <template v-slot:loading>
        <Loading color="#0089ff" size="40" type="spinner"/>
      </template>
    </VanImage>
    <VanImage v-else :src="InsuranceRelation_propertyImg" fit="contain" @load="ImageLoad">
      <template v-slot:loading>
        <Loading color="#0089ff" size="40" type="spinner"/>
      </template>
    </VanImage>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isView: number
}>()

const emits = defineEmits<{
  (e: 'InsuranceBodyH', val: string | undefined): void
}>()

import {Image as VanImage, Loading} from 'vant';

const InsuranceRelation_personnelImg: any = new URL('../../assets/image/personnelInjured.gif', import.meta.url).href;
const InsuranceRelation_propertyImg: any = new URL('../../assets/image/itemsDamage.gif', import.meta.url).href;

const ImageLoad = () => {
  emits('InsuranceBodyH', 'auto');


}
</script>


<style lang="scss" scoped>
.insurance_relation {
  padding: 0 24px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #ffffff;

  :deep(.van-image) {
    height: inherit;

    :deep(.van-image__loading) {
      background: #ffffff;
    }
  }
}
</style>