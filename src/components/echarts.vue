<template>
  <v-chart :option="props.option" autoresize class="chart"/>
</template>

<script lang="ts" setup>

const props = defineProps({
  option: String
})
</script>

<style scoped>
</style>