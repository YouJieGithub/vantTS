<template>
  <HeadBack :onClickLeft="toPage" :title="`${singleInfo.name}详情`"></HeadBack>
  <div class="singleanalyze">
    <div class="single">
      <div class="collect-content-num">
        <div>{{ !singleInfo.count ? 0 : singleInfo.count }}</div>
        <div>月累计单量</div>
      </div>
      <div class="collect-content-num">
        <div>{{ !singleInfo.average ? 0 : singleInfo.average }}</div>
        <div>日均单量</div>
      </div>
      <div class="collect-content-num">
        <div>{{ !singleInfo.apex ? 0 : singleInfo.apex }}</div>
        <div>峰值单量</div>
      </div>
    </div>
    <div v-if="!isBarOption" class="echarts-zhuan">
      <div>地区单量统计</div>
      <div>
        <VEcharts :option="barOption" class="single_analyze-statistics-echarts" @click="onBarEcharts"></VEcharts>
      </div>
    </div>
    <div class="echarts-zhuan">
      <div>地区单量走势</div>
      <div>
        <VEcharts :option="lineOption" class="single_analyze-statistics-echarts"></VEcharts>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import VEcharts from '@/components/echarts.vue';
import {orderanalysisInfo, orderanalysisRegion, orderanalysisTrend} from "@/API/single";
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";


const router = useRouter();
const route = useRoute();
let cache: object = {};    //缓存上一次参数
const singleInfo = ref<any>({})
const barOption = ref<any>({});
const lineOption = ref<any>({});
const isBarOption = ref<boolean>(false)

const fontSize = (val: number) => {
  return val * (window.innerWidth / window.innerHeight)
};

const getOrderanalysisInfo = (dataRes: object) => {
  orderanalysisInfo(dataRes).then(res => {
    singleInfo.value = res.data.data;
    isBarOption.value = !res.data.data.flag;
    console.log(isBarOption.value)
  })
};

//柱形图
const getRegion = (dataRes: any) => {
  orderanalysisRegion(dataRes).then(res => {
    const data = res.data.data;
    isBarOption.value = data.length === 0;
    barOption.value = {
      legend: {},
      tooltip: {},
      grid: {
        top: 20,
        left: 40,
        right: 40,
        bottom: 40
      },
      dataset: {
        source: data.map((r: any) => {
          return [r.name, r.count, r.dept]
        })
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: 40,
          color: '#999999',
          fontSize: fontSize(20)
        }
      },
      yAxis: {
        axisLabel: {
          color: '#999999',
          fontSize: fontSize(20),
          formatter: function (value: number) {
            if (value >= 10000) {
              return `${value / 10000}万`;
            } else {
              return value
            }
          }
        },
      },
      series: [{
        type: 'bar', itemStyle: {
          color: '#ff9c00',
          borderRadius: [8, 8, 0, 0]
        },
        barWidth: "30%"
      }]
    }
  });
};
//折线图
const isLineOption = ref<boolean>(true);
const getTrend = (dataRes: object) => {
  orderanalysisTrend(dataRes).then(res => {
    const data = res.data.data;
    // if (data.length === 0) {
    //   isLineOption.value = false
    // }

    lineOption.value = {
      legend: {},
      tooltip: {},
      grid: {
        top: 20,
        left: 40,
        right: 40,
        bottom: 20
      },
      dataset: {
        source: data.map((r: any) => {
          return [r.name, r.count]
        })
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: 40,
          color: '#999999',
          fontSize: fontSize(20)
        }
      },
      yAxis: {
        axisLabel: {
          color: '#999999',
          fontSize: fontSize(20),
          formatter: function (value: number) {
            if (value >= 10000) {
              return `${value / 10000}万`;
            } else {
              return value
            }
          }
        },
      },
      series: {
        type: 'line',
        itemStyle: {
          color: '#ff9c00',
          borderRadius: [8, 8, 0, 0]
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: "#ff9c00"
            }, {
              offset: 0.5, color: "#ececec"
            },
              {
                offset: 1, color: "#ffffff"
              }],
          }
        }
      }
    }
  })
};

//柱形图点击事件
const onBarEcharts = (val: any) => {
  //进入下一级的时候缓存当前的参数 cache
  cache = {
    dept: route.query.id,
    month: route.query.month
  }
  let data = {
    dept: val.data[2],
    month: route.query.month
  }
  getOrderanalysisInfo(data)
  getTrend(data)
  getRegion(data)
};
const toPage = () => {
  /**
   * 缓存参数不为空  请求缓存的父级参数  且清空缓存
   * 为空跳转上一页面
   */
  if (Object.keys(cache).length != 0) {
    getOrderanalysisInfo(cache)
    getTrend(cache)
    getRegion(cache)
    cache = {};
  } else {
    router.back()
  }
};
onBeforeMount(() => {
  let data = {
    dept: route.query.id,
    month: route.query.month
  }
  getOrderanalysisInfo(data)
  getTrend(data)
  getRegion(data)
})
</script>

<style lang="scss" scoped>
.singleanalyze {
  margin: 0 24px;
}

.single {
  padding: 0 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  color: #ffffff;
  border-radius: 24px;
  background: url("@/assets/image/singleanalyze.png") no-repeat;
  background-size: 100%;

  .collect-content-num {
    > div:first-child {
      font-size: 36px;
      font-weight: 700;
    }

    > div:last-child {
      font-size: 24px;
    }
  }
}

.echarts-zhuan {
  margin-top: 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 24px;

  > div:first-child {
    padding: 37px 0;
    font-size: 24px;
    color: #ff9c00;
  }

  > div:last-child {
    .single_analyze-statistics-echarts {
      height: 311px;
    }
  }
}
</style>