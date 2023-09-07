<template>
  <HeadBack :title="'单量分析'"></HeadBack>
  <div class="single">
    <Sticky :offset-top="46">
      <div class="time-operate">
        <div
            :style="dayjs(dateVal.join('-')).valueOf() <= dayjs(dayjs(minDate).format('YYYY-MM')).valueOf()?'color:#999999':'color:#ff9c00'"
            class="time-operate-color"
            @click="dateUp">上一月
        </div>
        <div class="time-operate-date" @click="show=true">
          <Icon name="notes-o"/>
          {{ `${dayjs(dateVal.join('-')).format('YYYY年MM月')}` }}
          <div :class="'time-operate-date-icon'"></div>
        </div>
        <div
            :style="dayjs(dateVal.join('-')).valueOf() <= dayjs(dayjs(minDate).format('YYYY-MM')).valueOf()?'color:#ff9c00':'color:#999999'"
            class="time-operate-color"
            @click="dateDown">下一月
        </div>
      </div>
    </Sticky>
  </div>
  <div class="collect">
    <div class="collect-title">单量汇总</div>
    <div class="collect-content">
      <div class="collect-content-num">
        <div>{{ !summary.mnthlyCumulative ? 0 : summary.mnthlyCumulative }}</div>
        <div>
          <font-svg :class="'iconSvg'" :icon="'#icon-yueleijidanliang-87'"/>
          月累计单量
        </div>
      </div>
      <div class="collect-content-num">
        <div>{{ !summary.ailyAverage ? 0 : summary.ailyAverage }}</div>
        <div>
          <font-svg :class="'iconSvg'" :icon="'#icon-zuoridanliang-92'"/>
          日均单量
        </div>
      </div>
      <div class="collect-content-num">
        <div>{{ !summary.apex ? 0 : summary.apex }}</div>
        <div>
          <font-svg :class="'iconSvg'" :icon="'#icon-fengzhidanliang-104'"/>
          峰值单量
        </div>
      </div>
    </div>
  </div>
  <div v-for="(item,index) in echartsList" :key="item.id" class="Meituan">
    <div class="collect">
      <div :class="'collect-title Meituan-tile title'+index">{{ item.name }}</div>
      <div class="collect-content">
        <div class="collect-content-num">
          <div>{{ !item.singInfo.count ? 0 : item.singInfo.count }}</div>
          <div>月累计单量</div>
        </div>
        <div class="collect-content-num">
          <div>{{ !item.singInfo.average ? 0 : item.singInfo.average }}</div>
          <div>日均单量</div>
        </div>
        <div class="collect-content-num">
          <div>{{ !item.singInfo.apex ? 0 : item.singInfo.apex }}</div>
          <div>峰值单量</div>
        </div>
      </div>
    </div>
    <div v-if="!!item.barOption" class="echarts-zhuan">
      <div>地区单量统计</div>
      <div>
        <VEcharts :option="item.barOption" class="single_analyze-statistics-echarts" @click="onBarEcharts"></VEcharts>
      </div>
    </div>
    <div class="echarts-zhuan">
      <div>地区单量走势</div>
      <div>
        <VEcharts :option="item.lineOption" class="single_analyze-statistics-echarts"></VEcharts>
      </div>
    </div>
  </div>
  <Popup v-model:show="show" close-on-popstate position="bottom" round safe-area-inset-bottom transition-appear>
    <DatePicker v-model="dateVal" :columns-type="['year', 'month']" :formatter="formatterDate" :maxDate="maxDate"
                :minDate="minDate" @cancel="show=false;" @confirm="dateConfirm"></DatePicker>
  </Popup>
</template>

<script lang="ts" setup>
import type {PickerOption} from 'vant';
import {DatePicker, Icon, Popup, Sticky} from 'vant';
import VEcharts from '@/components/echarts.vue';
import HeadBack from '@/components/header.vue';
import fontSvg from '@/components/fontSvg.vue';
import {onBeforeMount, ref} from "vue";
import dayjs from "dayjs";
import {
  orderanalysis,
  orderanalysisInfo,
  orderanalysisRegion,
  orderanalysisSummary,
  orderanalysisTrend
} from "@/API/single";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const show = ref<boolean>(false);
const dateVal = ref<any>([dayjs().format('YYYY'), dayjs().format('MM')]);
const minDate = ref<any>(dayjs().subtract(2, 'year').toDate());
const maxDate = ref<Date>(new Date());
const dateUp = () => {
  if (dayjs(dateVal.value.join('-')).subtract(1, 'month').valueOf() >= dayjs(dayjs(minDate.value).format('YYYY-MM')).valueOf()) {
    dateVal.value = dayjs(dateVal.value.join('-')).subtract(1, 'month').format('YYYY-MM').split('-');
    getOrderanalysis({month: dateVal.value.join('-')})
  }
};
const dateDown = () => {
  if (dayjs(dateVal.value.join('-')).add(1, 'month').valueOf() <= dayjs(dayjs().format('YYYY-MM')).valueOf()) {
    dateVal.value = dayjs(dateVal.value.join('-')).add(1, 'month').format('YYYY-MM').split('-');
    getOrderanalysis({month: dateVal.value.join('-')})
  }
};
const summary = ref<any>({})

const dateConfirm = ({selectedValues}: any) => {
  dateVal.value = selectedValues;
  let value: string = selectedValues.join('-');
  getOrderanalysis({month: value})
  show.value = false;
}
const formatterDate = (type: string, option: PickerOption) => {
  switch (type) {
    case 'year':
      option.text = `${option.text}年`
      break;
    case 'month':
      option.text = `${option.text}月`
      break;
  }
  return option;
};

const fontSize = (val: number) => {
  return val * (window.innerWidth / window.innerHeight)
};

const echartsList = ref<any>([]);

//柱形图
const getRegion = (dataRes: any) => {
  orderanalysisRegion(dataRes).then(res => {
    const data = res.data.data;
    // isBarOption.value = data.length === 0;
    echartsList.value.forEach((r: any) => {
      if (r.id === dataRes.dept) {
        r.barOption = {
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
      }
    })
  });
};

//柱形图点击事件
const onBarEcharts = (val: any) => {
  let id = val.data[2];
  router.push({path: '/singleanalyze', query: {id, month: dateVal.value.join('-')}})
};
//折线图
const isLineOption = ref<boolean>(true);
const getTrend = (dataRes: any) => {
  orderanalysisTrend(dataRes).then(res => {
    const data = res.data.data;
    if (data.length === 0) {
      isLineOption.value = false
    }
    echartsList.value.forEach((r: any) => {
          if (r.id === dataRes.dept) {
            r.lineOption = {
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
          }
        }
    )
  })
};
const getOrderanalysisInfo = (dataRes: any) => {
  orderanalysisInfo(dataRes).then(res => {
    echartsList.value.forEach((r: any) => {
      if (r.id === dataRes.dept) {
        r.singInfo = res.data.data
      }
    })
  })
};
const getOrderanalysisSummary = (data: unknown) => {
  orderanalysisSummary(data).then(res => {
    if (!!res) {
      summary.value = res.data.data[0]
    }
  })
}
const getOrderanalysis = (time: unknown) => {
  echartsList.value = []
  getOrderanalysisSummary(time)
  orderanalysis(time).then(res => {
    res.data.data.forEach((r: any) => {
      let data = {
        dept: r.id,
        month: dateVal.value.join('-')
      }
      echartsList.value.push({
        id: r.id,
        name: r.name,
        className: `echarts${r.id}`,
        singInfo: {}
      })
      console.log(echartsList.value)
      getOrderanalysisInfo(data)
      getTrend(data)
      if (r.flag === 1) {
        getRegion(data)
      }
    });
  })
};

onBeforeMount(() => {
  getOrderanalysis({month: dateVal.value.join('-')})
})

</script>
<style>
#app {
  height: initial;
}
</style>
<style lang="scss" scoped>
$color: #ff9c00;
.single {
  //padding: 0 24px;

}

.time-operate {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  background-color: #f7f7ff;

  .time-operate-date {
    padding: 10px 26px;
    text-align: center;
    background-color: #ff9c00;
    border-radius: 14px;
    color: #fefefe;

    .van-icon {
      margin-right: 15px;
    }

    .time-operate-date-icon {
      margin-left: 15px;
      margin-top: -6px;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top: 12px solid #fefefe;
      vertical-align: middle;
    }
  }
}

.collect {
  margin: 0 24px;
  padding: 40px 30px;
  background-color: #ffffff;
  border-radius: 24px;

  .collect-title {
    padding-left: 17px;
    position: relative;
    font-size: 28px;
    color: #333333;
  }

  .collect-title:before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: "";
    width: 0.05333rem;
    height: 0.32rem;
    background-color: #ff9c00;
    border-radius: 0.02667rem;
  }

  .collect-content {
    padding: 0 45px - 30px;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .collect-content-num {
      > div:first-child {
        font-size: 36px;
        color: #333333;
        font-weight: bolder;
      }

      > div:last-child {
        font-size: 24px;
        color: #999999;

        .iconSvg {
          margin-right: 12px;
        }
      }
    }
  }
}

.Meituan {
  margin: 20px 24px;
  padding-bottom: 40px;
  background-color: #ffffff;
  border-radius: 24px;

  .collect {
    margin: 0;
  }

  .Meituan-tile {
    padding-left: 42px;
  }

  .title0:before {
    background: url("@/assets/image/zhuan.png") no-repeat;
  }

  .title1:before {
    background: url("@/assets/image/dai.png") no-repeat;
  }

  .title2:before {
    background: url("@/assets/image/Pizzahut.png") no-repeat;
  }

  .Meituan-tile:before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: "";
    width: 28px;
    height: 28px;
    background-size: 28px;
  }


  .echarts-zhuan {
    text-align: center;

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
}


</style>