<template>
  <div class="sticky-personnel">
    <HeadBack :title="'人员分析'"></HeadBack>
  </div>
  <div class="analyze-detail">
    <Field v-model="depFieldValue" class="analyze-field" placeholder="选择部门" readonly right-icon="arrow-down"
           @click="show = true"/>
    <Popup v-model:show="show" position="bottom" round safe-area-inset-bottom safe-area-inset-top teleport="body">
      <Cascader v-model="cascaderValue" :close-icon="depCloseIcon"
                :field-names="{text:'depName',value:'id'}" :options="depOptions" active-color="#ff9c00"
                title="请选择所在部门"
                @change="onDepChange" @close="onDepClose"/>
    </Popup>
    <div class="single-detail-content">
      <div class="single-detail-content-title">人员状态</div>
      <div class="personnel-status">
        <div class="personnel-status-left">
          <p>{{ statisticNumsList.total }}</p>
          <p>在职员工</p>
        </div>
        <div class="personnel-status-right van-hairline--left">
          <div class="personnel-status-right-top van-hairline--bottom">
            <div><p>{{ statisticNumsList.fulling }}</p>
              <p>全职</p></div>
            <div><p>{{ statisticNumsList.parting }}</p>
              <p>兼职</p></div>
            <div><p></p>
              <p></p></div>
          </div>
          <div class="personnel-status-right-bottom">
            <div><p>{{ statisticNumsList.trialing }}</p>
              <p>试岗期</p></div>
            <div><p>{{ statisticNumsList.working }}</p>
              <p>正式</p></div>
            <div><p>{{ statisticNumsList.resigning }}</p>
              <p>离职中</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="single-detail-content">
      <div class="single-detail-content-title">
        <div>入离职人员数据 <span class="tip">{{ EntryInductionSum.EntryInductionSumTip }}</span>
          <div class="single-detail-EntryAndExit" style="border-radius:4px">
            <div
                :style="EntryAndExitQueryType!==0?'color:#ff9c00;background-color:#fff3df;border-radius: 4px 0 0 4px;':'color:#999999;background-color:#f7f7ff;border-radius: 4px 0 0 4px;'"
                @click="onEntryAndExitVal(1)">周
            </div>
            <div
                :style="EntryAndExitQueryType!==0?'color:#999999;background-color:#f7f7ff;border-radius: 0 4px 4px 0;':'color:#ff9c00;background-color:#fff3df;border-radius: 0 4px 4px 0;'"
                @click="onEntryAndExitVal(0)">月
            </div>
          </div>
        </div>
      </div>
      <div class="entry-induction-sum">
        <div>
          <p>{{ EntryInductionSum.startNums }}</p>
          <p>期初人数</p>
        </div>
        <div>
          <p>{{ EntryInductionSum.endNums }}</p>
          <p>期末人数</p>
        </div>
        <div>
          <p>{{ EntryInductionSum.entryNums }}</p>
          <p>入职</p>
        </div>
        <div>
          <p>{{ EntryInductionSum.resignNums }}</p>
          <p>离职</p>
        </div>
      </div>
      <VEcharts :option="lineOption" class="single_analyze-statistics-echarts"></VEcharts>
    </div>
    <div class="single-detail-content">
      <div class="single-detail-content-title">
        <div class="single-detail-OnboardingSources">入职来源统计</div>
      </div>
      <Row gutter="10">
        <Col span="5">
          <div class="single-detail-EntryAndExit" style="border-radius: 4px;">
            <div
                :style="OnboardingSourcesType!==1?'color:#ff9c00;background-color:#fff3df;border-radius: 4px 0 0 4px;':'color:#999999;background-color:#f7f7ff;border-radius: 4px 0 0 4px;'"
                @click="onOnboardingSourcesVal(0)">周
            </div>
            <div
                :style="OnboardingSourcesType!==1?'color:#999999;background-color:#f7f7ff;border-radius: 0 4px 4px 0;':'color:#ff9c00;background-color:#fff3df;border-radius: 0 4px 4px 0;'"
                @click="onOnboardingSourcesVal(1)">月
            </div>
          </div>
        </Col>
        <Col span="19">
          <div class="dateQueryTypeCut">
            <Button icon="arrow-left" size="mini" type="default" @click="upDate"></Button>
            <template v-if="OnboardingSourcesType===1">
              <div><span>{{ month }}</span></div>
            </template>
            <template v-else>
              <div><span>{{ weekDay[0] }}</span>至<span>{{ weekDay[1] }}</span></div>
            </template>
            <Button :disabled="monthBut" icon="arrow" size="mini" type="default" @click="nextDate"></Button>
          </div>
        </Col>
      </Row>
      <VEcharts :option="OnboardingSourcesOption" class="single_analyze-statistics-echarts"></VEcharts>
    </div>
    <div class="single-detail-content">
      <div class="single-detail-content-title">
        <div class="single-detail-OnboardingSources">年龄统计</div>
      </div>
      <VEcharts :option="ageOption" class="single_analyze-statistics-echarts"></VEcharts>
    </div>
    <div class="single-detail-content">
      <div class="single-detail-content-title">
        <div class="single-detail-OnboardingSources">工龄统计</div>
      </div>
      <VEcharts :option="workAgeOption" class="single_analyze-statistics-echarts"></VEcharts>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import VEcharts from '@/components/echarts.vue';
import {Button, Cascader, Col, Field, Popup, Row} from 'vant';
import {onBeforeMount, ref} from 'vue'
import {countAge, countDivergence, countInfo, countSeniority, depList, statisticNums} from "@/API/analyze";
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear';

import sureImg from '@/assets/image/sure.png'

dayjs.extend(weekOfYear)


const depId = ref<number | null>(null);   //部门id
const depCloseIcon = ref<any>(sureImg);     //部门 级联选择框关闭图标
const depFieldValue = ref<string>('');
const show = ref<boolean>(false);
const cascaderValue = ref<string>('');
const depOptions = ref<Array<object>>([]);

//获取echarts部门树列表
const getDepList = () => {
  depList().then(res => {
    depOptions.value = res.data.rows;
  })
}
//选择下拉列表
let DepTemp_depId_Change: number | null = null;
let DepTemp_depFieldValue_Change: string = '';
const onDepChange = (val: any) => {
  DepTemp_depId_Change = val.value;
  DepTemp_depFieldValue_Change = val.selectedOptions[val.selectedOptions.length - 1].depName;
};
const onDepClose = () => {
  if (!!DepTemp_depId_Change && !!DepTemp_depFieldValue_Change) {
    depId.value = DepTemp_depId_Change;
    depFieldValue.value = DepTemp_depFieldValue_Change;
    allServe()
  }
  DepTemp_depId_Change = null;
  DepTemp_depFieldValue_Change = "";
  show.value = false;
}

//人员类型以及状态统计
const statisticNumsList = ref<any>({})
const statisticNumsSever = () => {
  statisticNums(depId.value).then(res => {
    statisticNumsList.value = res.data.nums;
  })
}


//入离职数据
let EntryInductionSum = ref<any>([{
  startNums: 0,
  endNums: 0,
  entryNums: 0,
  resignNums: 0
}])
const lineOption = ref<any>({}); //图标option
const EntryAndExitQueryType = ref<number>(0);   //周 or 月 0：按月查询，1：按周查询
const onEntryAndExitVal = (res: number) => {       //单选框
  EntryAndExitQueryType.value = res;
  countDivergenceSever()
}
const countDivergenceSever = () => {
  countDivergence(EntryAndExitQueryType.value, depId.value).then(res => {
    let dataSetXis: [any] = ['product'];
    let dataSetEntry = ['入职'];
    let dataSetDimission = ['离职'];
    for (let i in res.data.entryList) {
      dataSetXis.push(res.data.entryList[i][0])
      dataSetEntry.push(res.data.entryList[i][1])
    }
    for (let j in res.data.resignList) {
      dataSetXis.push(res.data.resignList[j][0])
      dataSetDimission.push(res.data.resignList[j][1])
    }

    let unique: any = [];
    let obj: any = {};
    for (let z = 0; z < dataSetXis.length; z++) {
      if (!obj[dataSetXis[z]]) {
        obj[dataSetXis[z]] = 1;
        unique.push(dataSetXis[z]);
      }
    }

    EntryInductionSum.value = {
      startNums: res.data.startNums,
      endNums: res.data.endNums,
      entryNums: res.data.entryNums,
      resignNums: res.data.resignNums
    };
    if (EntryAndExitQueryType.value === 0) {
      EntryInductionSum.value.EntryInductionSumTip = `${unique[1] + '-' + '01'}至${unique[unique.length - 1] + '-' + new Date(new Date().getFullYear(), new Date(unique[unique.length - 1]).getMonth() + 1, 0).getDate()}`
    } else {
      EntryInductionSum.value.EntryInductionSumTip = `${new Date().getFullYear() + '-' + unique[1].split('至')[0].replace('.', '-')}至${new Date().getFullYear() + '-' + unique[unique.length - 1].split('至')[1].replace('.', '-')}`
    }
    lineOption.value = {
      legend: {
        right: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          animation: true,
        },
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0)',
        textStyle: {color: '#fff'}
      },
      grid: {
        top: 50,
        left: 0,
        right: 0,
        bottom: '9%',
        containLabel: true
      },
      dataset: {
        source: [unique, dataSetEntry, dataSetDimission]
      },
      xAxis: {type: 'category'},
      yAxis: {gridIndex: 0},
      series: [
        {type: 'line', seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
        {type: 'line', seriesLayoutBy: 'row', emphasis: {focus: 'series'}}
      ],
      color: ['#0089ff', '#ff9c00']
    }
  })
};

//入职来源统计
const OnboardingSourcesOption = ref<any>({})
const OnboardingSourcesType = ref<number>(1);    //周 or 月 0：按周查询，1：按月查询
const onOnboardingSourcesVal = (res: number) => {       //单选框
  OnboardingSourcesType.value = res;
  dateQueryTypeCut()
}
let queryTypeNum: number = 1;
const weekDay = ref<string[]>([])
const month = ref<string>('')
const monthBut = ref<boolean>(false)
const dateQueryTypeCut = () => {
  queryTypeNum = 1;
  DateFrom()
};
const upDate = () => {
  queryTypeNum++;
  DateFrom()
};
const nextDate = () => {
  queryTypeNum--;
  DateFrom()
};
const DateFrom = () => {
  if (OnboardingSourcesType.value === 1) {
    let dateM = dayjs().subtract(queryTypeNum, 'month');
    console.log('这是时间', dateM.year())
    if (dayjs().year() == dateM.year()) {
      monthBut.value = dayjs().month() - 1 <= dateM.month();
    } else monthBut.value = dayjs().year() <= dateM.year();
    month.value = dateM.year() + "-" + ((dateM.month() + 1) < 10 ? `0${dateM.month() + 1}` : dateM.month() + 1);
  } else {
    let dateM = dayjs().subtract(queryTypeNum, 'week');
    // 本周一的日期
    dateM = dateM.set('date', dateM.date() - dateM.get('day') + 1);
    let begin = dateM.year() + "-" + ((dateM.month() + 1) < 10 ? `0${dateM.month() + 1}` : dateM.month() + 1) + "-" + (dateM.date() < 10 ? '0' + dateM.date() : dateM.date());
    // 本周日的日期
    dateM = dateM.set('date', dateM.date() + 6);

    //先比较年后比较周
    if (dayjs().year() === dateM.set('date', dateM.date() - 6).year()) {
      monthBut.value = dayjs().week() <= dateM.week() + 1;
    }
    if (dayjs().year() > dateM.set('date', dateM.date() - 6).year()) {
      monthBut.value = dayjs().week() >= dateM.week() + 1;
    }
    let end = dateM.year() + "-" + ((dateM.month() + 1) < 10 ? `0${dateM.month() + 1}` : dateM.month() + 1) + "-" + (dateM.date() < 10 ? '0' + dateM.date() : dateM.date());
    weekDay.value = [begin, end]
  }
  countInformSever()
};
const countInformSever = () => {
  let requestData: any = {
    departmentId: depId.value,
    queryType: OnboardingSourcesType.value
  };
  if (OnboardingSourcesType.value === 1) {
    requestData.month = month.value;
  } else {
    requestData.weekDay = weekDay.value;
  }
  countInfo(requestData).then((res: any) => {
    res.data.result.unshift(['product', '入职来源'])
    OnboardingSourcesOption.value = {
      legend: {
        orient: 'vertical',
        right: '1%',
        top: '10%',
        itemWidth: 20,
        itemHeight: 11,
        width: 180,
        height: 100,
        // icon: 'circle',
        textStyle: {
          width: 180,
          height: 20,
        },
      },
      dataset: {
        source: res.data.result
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0)',
        textStyle: {color: '#fff'}
      },
      series: [
        {
          name: '入职来源统计',
          type: 'pie',
          label: {
            show: false
          },
          radius: ['35%', '60%'],
          center: ['20%', '40%'],
          emphasis: {focus: 'data'}
        }
      ],
      color: ['#3791f8', '#df86e0', '#5a53c7', '#72f4f6', '#ff6988', '#ffda2d', '#f2a871']
    }
  })
};

//年龄统计
const ageOption = ref<any>({});
const countAgeSever = () => {
  countAge(depId.value).then(res => {
    res.data.result.unshift(['product', '年龄统计'])
    ageOption.value = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          animation: true,
        },
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0)',
        textStyle: {color: '#fff'}
      },
      dataset: {
        source: res.data.result
      },
      grid: {
        top: 30,
        left: 0,
        right: 0,
        bottom: 20,
        containLabel: true
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
        {
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: '{@[1]}人',
            color: '#ff9c00'
          },
          barWidth: '16px',
          itemStyle: {
            color: '#ff9c00',
            borderRadius: [8, 8, 0, 0]
          }
        }
      ]
    }
  })
};

//工龄统计
const workAgeOption = ref<any>({});
const countSenioritySever = () => {
  countSeniority(depId.value).then(res => {
    res.data.result.unshift(['product', '工龄'])
    workAgeOption.value = {
      legend: {
        orient: 'vertical',
        right: '10%',
        top: '10%',
        itemWidth: 20,
        itemHeight: 11
      },
      dataset: {
        source: res.data.result
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0)',
        textStyle: {color: '#fff'}
      },
      series: [
        {
          name: '工龄统计',
          type: 'pie',
          label: {
            show: false
          },
          radius: ['35%', '60%'],
          center: ['20%', '50%'],
          emphasis: {focus: 'data'}
        }
      ],
      color: ['#3791f8', '#df86e0', '#5a53c7', '#72f4f6', '#ff6988', '#ffda2d']
    }
  })
};


// 图表数据统一请求
const allServe = () => {
  getDepList()
  statisticNumsSever()
  countDivergenceSever()
  dateQueryTypeCut()
  countAgeSever()
  countSenioritySever()
}
onBeforeMount(() => {
  allServe()
})

</script>

<style lang="scss" scoped>
.analyze-detail {
  padding: 27px 24px;
  background-color: #f7f7ff;
}

.analyze-field {
  padding-top: 8px;
  padding-bottom: 8px;
  max-width: 400px;
  width: max-content;
  border-radius: 4px;
}

.single-detail-content:nth-of-type(2) {
  height: 330px;
}

.single-detail-content:nth-of-type(3) {
  position: relative;
  height: 406px;
}

.single-detail-content:nth-of-type(4), .single-detail-content:nth-of-type(6) {
  height: 340px;

  :deep(.van-row) {
    margin-top: 20px;
  }
}

.single-detail-content:nth-of-type(5) {
  height: 350px;
}

.single-detail-content {
  margin: 20px 0;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  text-align: left;

  .single-detail-content-title {
    position: relative;
    padding-left: 28px;
    font-size: 28px;
    font-weight: bolder;
  }

  .single-detail-content-title:before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: '';
    width: 4px;
    height: 24px;
    background-color: #ff9c00;
    border-radius: 2px;
  }

  .personnel-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    .personnel-status-left {
      flex: 1;
      text-align: center;

      p:first-child {
        font-size: 50px;
      }
    }

    .personnel-status-right {
      padding-left: 40px;
      flex: 2;

      p:first-child {
        font-size: 32px;
      }

      p:last-child {
        font-size: 20px;
      }

      .personnel-status-right-top {
        padding: 30px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        div {
          flex: 1;

        }
      }

      .personnel-status-right-bottom {
        padding: 30px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        div {
          flex: 1;
        }
      }
    }
  }
}

.tip {
  padding-left: 10px;
  font-size: 22px;
  text-align: left;
  color: #999999;
  font-weight: 100;
}

.single-detail-EntryAndExit {
  display: inline-block;
  float: right;
  width: 110px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  background-color: #f0f8ff;


  div {
    display: inline-block;
    width: (110px/2);
    text-align: center;
  }
}

.single-detail-OnboardingSources {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry-induction-sum {
  position: absolute;
  top: 60px;
  left: 30px;
  display: flex;
  font-size: 22px;
  color: #191f25;
  text-align: center;

  div {
    padding: 10px;

    p {
      line-height: 40px;
      font-weight: 100;
    }
  }
}

.dateQueryTypeCut {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
  height: initial;
  background-color: #f7f7ff;
  border-radius: 4px;
  color: #999999;

  .Button {
    width: 30px;
    background-color: #f7f7ff;
    border: none;
    color: #999999;
  }

  div {
    padding: 0 2px;
    font-size: 24px;
    font-weight: normal;
    color: #999999;
  }
}

.DepSmall {
  font-size: 9px;
  color: #999999;
}
</style>