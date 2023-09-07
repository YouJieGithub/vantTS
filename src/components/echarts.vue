<template>
  <v-chart :option="option" autoresize class="chart"/>
</template>

<script lang="ts" setup>
import VChart from "vue-echarts";
import {use} from "echarts/core";
import {ECBasicOption} from 'echarts/types/dist/shared'
import {CanvasRenderer} from "echarts/renderers";
import {BarChart, LineChart, PieChart} from "echarts/charts";
import {DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent,} from "echarts/components";

use([
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
]);

defineProps<{
  option: ECBasicOption | undefined
}>()
</script>

<style scoped>
</style>