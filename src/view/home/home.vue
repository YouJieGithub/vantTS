<template>
  <div class="home-page">
    <div class="home-page-bg"></div>
    <div class="page">
      <div class="page-user-info" @click="router.push('personalinfo')">
        <div class="page-user-info-img">
          <img alt="头像" src="@/assets/image/avatar.png">
          <div class="page-user-info-icon">
            <fontSvg :icon="icon"></fontSvg>
          </div>
        </div>
        <div class="page-user-info-title"><p>{{ username }}</p>
          <div class="page-user-info-flag">15812345678</div>
        </div>
      </div>
    </div>
    <div class="card card-single" @click="router.push('singledetail')">
      <img alt="单量" src="@/assets/image/SingleQuery.png">
      <div class="card-single-yesterday">
        <p>{{ quantityInfo.time }}</p>
        <p>{{ quantityInfo.yesterdayCount }}</p>
        <p>昨日单量
          <fontSvg :class="'card-single-yesterday-icon'" :icon="'#icon-zuoridanliang-86'"></fontSvg>
        </p>
      </div>
      <div class="card-single-total">
        <div class="card-single-month">
          <p>{{ quantityInfo.count }}</p>
          <p>月累计单量</p>
        </div>
        <div class="card-single-day">
          <p>{{ quantityInfo.changeCount }}</p>
          <p>单量变化</p>
        </div>
      </div>
    </div>
    <div class="card menu">
      <img alt="菜单" src="@/assets/image/menu.png">
      <div class="menu-swiper">
        <div class="menu-swiper-list">
          <template v-for="(item,index) in card" :key="index">
            <div v-if="item.status.includes(staffFlag)" @click="onToPage(item.url)">
              <fontSvg :icon="item.icon"></fontSvg>
              <p>{{ item.title }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="!!noticelist.length" class="card notify">
      <img alt="通知" src="@/assets/image/notify.png">
      <div class="notify-list">
        <CellGroup v-for="item in noticelist" :key="item.id" :border="false" class="notify-list-content">
          <Cell :border="false" :to="{path:'/noticedetail',query:{id:item.id,status:item.status}}" is-link>
            <template #title>
              <span class="custom-title">{{ item.title }}</span>
              <Badge v-if="item.status===1" color="#f26a19" dot></Badge>
            </template>
            <template #label>
              <span class="custom-title">{{ item.author }}</span>
              <span class="custom-title">{{ item.pushTime }}</span>
            </template>
          </Cell>
        </CellGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onBeforeMount, reactive, ref, toRefs} from "vue";
import {Badge, Cell, CellGroup, showToast} from 'vant';
import {useStore} from '@/store';
import {useRouter} from "vue-router";
import {orderQuantity} from "@/API/single";
import {noticeHomeList} from "@/API/notice";

const router = useRouter();
const store = useStore();
const username = computed<string>(() => store.state.userInfoModule.username)
const staffFlag = computed<number | null>(() => store.state.userInfoModule.staffFlag)
const positionName = computed<string>(() => store.state.userInfoModule.positionName)


const state = reactive<any>({
  icon: '#icon-a-zhiweitubiao_huaban1fuben14',
  card: [
    {
      icon: '#icon-a-danliangfenxi_huaban1fuben73',
      title: '单量分析',
      tip: '各地区单量数据',
      status: [2],
      BGcolor: '#f0f8fe',
      url: '/singledetail'
    },
    {
      icon: '#icon-a-renyuanfenxi_huaban1fuben74',
      title: '人员分析',
      tip: '人员分析一目了然',
      status: [1, 2],
      BGcolor: '#f7f5fc',
      url: '/personnelanalyze'
    },
    {
      icon: '#icon-a-renyuanguanli_huaban1fuben72',
      title: '人员管理',
      tip: '人员状态快速查看',
      status: [1, 2],
      BGcolor: '#fffaf2',
      url: '/personnel'
    },
    {
      icon: '#icon-a-PAY_huaban1fuben92',
      title: 'PAY',
      tip: '押金收取',
      status: [0, 1, 2],
      BGcolor: '#fffaf2',
      url: ''
    },
    {
      icon: '#icon-a-baoanlipei_huaban1fuben54',
      title: '报案理赔',
      tip: '发生事故不用慌',
      status: [0, 1, 2],
      BGcolor: '#fffaf2',
      url: '/ClaimsList'
    },
    {
      icon: '#icon-a-yinhangka_huaban1fuben91',
      title: '银行卡',
      tip: '工资入账',
      status: [0, 1, 2],
      BGcolor: '#fff3f4',
      url: '/salary'
    },
    {
      icon: '#icon-a-yijianfankui_huaban1fuben76',
      title: '意见反馈',
      tip: '疑问解答',
      status: [0, 1, 2],
      BGcolor: '#eefffe',
      url: '/submitfeedback'
    },
    {
      icon: '#icon-a-tongzhi_huaban1fuben75',
      title: '通知',
      tip: '公司通知实时速递',
      status: [0, 1, 2],
      BGcolor: '#f1fff5',
      url: '/noticelist'
    },
    {
      icon: '#icon-a-wuliaoguanli_huaban1fuben71',
      title: '物料管理',
      tip: '物料记录',
      status: [0, 1],
      BGcolor: '#fdf7ff',
      url: ''
    }
  ]
});
const {flag, icon, card} = toRefs(state);


const onToPage = (val: string) => {
  if (!val) {
    showToast('暂未开通');
  } else {
    router.push(val)
  }
};
const quantityInfo = ref<any>({})
const getOrderQuantity = () => {
  orderQuantity().then(res => {
    quantityInfo.value = res.data.data;
  })
};
const noticelist = ref<any>([])
const getNoticeList = () => {
  noticeHomeList().then(res => {
    noticelist.value = res.data.rows;
  })
};
onBeforeMount(() => {
  getOrderQuantity()
  getNoticeList()
})
</script>

<style lang="scss" scoped>
$fontSize: 24px;
.home-page {
  padding: 0 24px 59px;
  height: 100%;
  background: url("@/assets/image/home.png") no-repeat top;
  background-size: 100%;

  .home-page-bg {
    position: absolute;
    top: 30px;
    right: 24px;
    z-index: 999;
    width: 438px;
    height: 305px;
    background: url("@/assets/image/homeBG.png") no-repeat center;
    background-size: 100%;
  }

  .page {
    padding-top: 94px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .page-user-info {
      display: flex;
      font-size: 36px;
      color: #333333;

      .page-user-info-img {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ffffff;
        background: #ffffff;

        img {
          width: 100%;
          //height: 100%;
          border-radius: 50%;
        }

        .page-user-info-icon {
          position: absolute;
          bottom: -4px;
          right: -4px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 46px;
          height: 22px;
          z-index: 999;
          background-color: #feb942;
          border-radius: 11px;

          svg {
            width: 46px;
            height: 22px;
          }
        }
      }

      .page-user-info-title {
        margin-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        p {
          font-size: 36px;
          color: #333333;
        }

        .page-user-info-flag {
          font-size: 24px;
          color: #666666;
        }
      }
    }
  }

  .card {
    position: relative;
    height: 340px - 115px;
    background-color: #ffffff;
    border-radius: 24px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      height: 60px;
    }
  }

  .card-single {
    margin-top: 80px;
    padding-top: 115px;
    display: flex;
    justify-content: space-around;


    .card-single-yesterday {
      color: #333333;
      font-size: 24px;

      p:nth-of-type(2) {
        font-size: 60px;
      }

      p:nth-of-type(3) {
        .card-single-yesterday-icon {
          margin-left: 19px;
          width: 34px;
          height: 34px;
          vertical-align: sub;
        }
      }
    }

    .card-single-total {
      div {
        position: relative;

        p:first-child {
          font-size: 28px;
          color: #333333;
        }

        p:last-child {
          font-size: $fontSize;
          color: #666666;
        }
      }

      .card-single-month {
        margin-bottom: 22px;
      }

      .card-single-month:before {
        position: absolute;
        top: 50%;
        left: -21px * 2;
        transform: translateY(-50%);
        display: inline-block;
        content: ' ';
        width: 21px;
        height: 24px;
        background: url("@/assets/image/month.png") no-repeat;
        background-size: 100%;
      }

      .card-single-day {
        margin-top: 22px;
      }

      .card-single-day:before {
        position: absolute;
        top: 50%;
        left: -24px * 2;
        transform: translateY(-50%);
        display: inline-block;
        content: ' ';
        width: 24px;
        height: 24px;
        background: url("@/assets/image/Single.png") no-repeat;
        background-size: 100%;
      }
    }
  }

  .card-single:before {
    position: absolute;
    top: 115px;
    left: 50%;
    transform: translateX(-50%);
    content: ' ';
    width: 1px;
    height: 180px;
    background-color: #dadada
  }

  .menu {
    margin-top: 20px;
    padding-bottom: 30px;
    height: initial;
    //height: 291px - 30px;
    background-color: #ffffff;
    border-radius: 24px;
    overflow: hidden;


    .menu-swiper {
      height: inherit;
      overflow: hidden;

      .menu-swiper-list {
        margin-top: 80px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;

        div {
          width: calc(702px / 4);
          padding: 10px 0;
          text-align: center;

          p:last-child {
            font-size: $fontSize;
            color: #333333;
          }
        }
      }
    }
  }

  .notify {
    height: initial;
    margin-top: 20px;
    margin-bottom: 50px;
    padding-top: 110px;
    padding-bottom: 52px;

    .notify-list {
      padding: 0 18px;

      .notify-list-content {
        padding: 30px 0;
        border-bottom: 1px dashed #ececec;

        .notify-list-content-text {
          padding: 20px;
          font-size: $fontSize;
          color: #666666;
        }

        > div:last-child {
          padding: 10px 0;
          font-size: $fontSize;
        }
      }

    }
  }

}


</style>
