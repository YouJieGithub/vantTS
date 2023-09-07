<template>
  <Popup :show="isShowPopupArea" position="bottom" round safe-area-inset-bottom transition-appear
         @click-overlay="$emit('areaCancel')">
    <Area :area-list="areaList" title="请选择" @cancel="$emit('areaCancel')"
          @confirm="({ selectedOptions})=>$emit('areaConfirm',selectedOptions.map((r:any)=>r.text).join('/'))"/>
  </Popup>
</template>

<script lang="ts" setup>
import {Area, Popup} from 'vant';
import {areaList} from '@vant/area-data';

defineProps<{
  isShowPopupArea: boolean
}>();

defineEmits<{
  (e: 'areaCancel'): void,
  (e: 'areaConfirm', result: object): void
}>()
</script>

<style lang="scss" scoped>

</style>