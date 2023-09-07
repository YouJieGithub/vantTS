<template>
  <svg :class="`${className} icon`" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string,
  className?: string
}>()
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>