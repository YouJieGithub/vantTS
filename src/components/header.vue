<template>
  <NavBar :border="false" class="nav" fixed left-arrow placeholder safe-area-inset-top @click-left="props.onClickLeft">
    <template #title>
      <span class="nav-title">{{ props.title }}</span>
    </template>
    <template #right>
      <slot></slot>
    </template>
  </NavBar>
</template>

<script lang="ts" setup>
import {NavBar} from 'vant';

interface Props {
  title: string,
  onClickLeft?: Function,
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  onClickLeft: () => history.back()
})
</script>

<style lang="scss" scoped>
.nav {
  :deep(.van-nav-bar) {
    background: #f7f7ff;
  }
}

.nav-title {
  font-size: 28px;
  font-weight: 500;
}

</style>