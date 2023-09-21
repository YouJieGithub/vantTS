<template>
  <div class="Mall">
    <div class="mall-header">
      <div class="Mall_HeadBack">
        <NavBar class="nav" left-arrow @click-left="() => router.back()"/>
      </div>
      <img src="../../assets/image/integral-mall-banner.png" alt="">
    </div>
    <div class="mall_Navigation">
      <div class="Navigation_content">
        <div><fontSvg :className="'content_icon'" :icon="'#icon-a-wodejifen_huaban1fuben101'"/></div>
        <div class="content_body">
          <div class="title_num">{{integral}}</div>
          <div>我的积分</div>
        </div>
      </div>
      <div class="Navigation_content">
        <div><fontSvg :className="'content_icon'" :icon="'#icon-a-jifenmingxi_huaban1fuben102'"/></div>
        <div class="content_body" @click="router.push('integralDetail')">
          <div class="title">积分明细</div>
          <div class="Navigation_content_label">GO</div>
        </div>
      </div>
      <div class="Navigation_content">
        <div><fontSvg :className="'content_icon'" :icon="'#icon-a-wodeduihuan_huaban1fuben103'"/></div>
        <div class="content_body" @click="router.push('ExchangeOrder')">
          <div class="title">我的兑换</div>
          <div class="Navigation_content_label">GO</div>
        </div>
      </div>
    </div>
    <List v-model:loading="loading" :finished="finished" @load="onLoad">
    <div class="mall_list">
      <div class="mall_list_header">
        <img class="list_header_left" src="../../assets/image/integral_Exchange.png" alt="">
        <div class="list_header_right" @click="router.push('integralRule')">积分兑换规则</div>
      </div>
      <div class="mall-body">
        <div class="mall-goods" v-for="(item,index) in list" :key="index" @click="router.push({path:'/goodsDetail',query:{id:item.id,integral:integral}})">
          <div class="goods_img"><VanImage class="goodsImage" :src="item.mainUrl[0]" :alt="item.name"/></div>
          <div class="goods_name"><TextEllipsis :content="item.name"/></div>
          <div class="goods_MarketPrice"><span>市场价格：￥</span>{{item.price}}</div>
          <div class="goods_pointsPrice">{{item.integralPrice}} <span>积分</span></div>
          <div class="submitExchange">立即兑换</div>
        </div>
      </div>
    </div>
    </List>
  </div>
</template>

<script setup lang="ts">
import { NavBar,Image as VanImage,TextEllipsis,List   } from 'vant';
import router from "@/router";
import FontSvg from "@/components/fontSvg.vue";
import {goodsList, Integral} from "@/API/points";
import {onBeforeMount, reactive, ref} from "vue";

const list=ref<any>([])

interface pageTypes {
  limit:number,
  page:number

}

const page = reactive<pageTypes>({
  limit: 10,
  page: 1
})
const total = ref<number>(0);

const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
//商品列表
const getGoodsList=(data:object)=>{
  loading.value = true;
  goodsList(data).then(res=>{
    list.value = list.value.concat(res.data.rows);
    total.value = res.data.total;
    finished.value = list.value.length === total.value;
    loading.value = false;
  })
}


//我的积分
const integral=ref<number>(0)

const getIntegral=()=>{
  Integral().then(res=>{
    integral.value=res.data.integral;
  })
}

const onLoad=()=>{
  page.page = page.page + 1;
  getGoodsList(page)
}


onBeforeMount(()=>{
  getGoodsList(page)
  getIntegral()
})

</script>

<style scoped lang="scss">
.Mall{
  height: 100%;
  background: #fff2e2;
  padding-bottom: 40px;
  .mall-header{
    position: relative;
    height: 401px;
    .Mall_HeadBack{
      position: absolute;
      top: 0;
      left: 0;
      .nav{
        background: transparent;
        :deep(.van-icon-arrow-left) {
          color: #ffffff;
        }
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
  }

  .mall_Navigation{
    margin: 38px 24px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Navigation_content{
      padding: 16px 12px;
      display: flex;
      justify-content: space-between;
      width: 224px - 24px;
      height: 110px - 32px;
      background-color: #ffffff;
      box-shadow: 0 2px 6px 0 #ffe0c0;
      border-radius: 24px;
      font-size: 24px;
      color: #333333;
      .content_icon{
        width: 78px;
        height: 78px;
      }
      .content_body{
        height: 100%;
        .title_num{
          line-height: 48px;
          font-size: 36px;
        }
        .title{
          line-height: 48px;
          font-size: 27px;
        }
        .Navigation_content_label{
          width: 57px;
          height: 29px;
          line-height: 29px;
          text-align: center;
          background-color: #fb5920;
          border-radius: 14px;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }

  .mall_list{
    margin: 20px 24px 0;
    border-radius: 24px;
    background: #ffffff;
    .mall_list_header{
      padding: 39px 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url("@/assets/image/integral_Exchange_header.png") no-repeat;
      background-size: 100%;
      .list_header_left{
        height: 32px;
      }
      .list_header_right{
        line-height: 24px;
        font-size: 24px;
        color: #999999;
        border-bottom: 1px solid #999999;
      }
    }
    .mall-body{
      margin: 24px 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .mall-goods{
        padding-bottom: 30px;
        .goods_img{
          width: 300px;
          height: 300px;
          border-radius: 24px;
          .goodsImage{
            height: 300px;
            :deep(img){
              border-radius: 24px;
            }
          }
        }
        .goods_name{
          margin-top: 30px;
          font-size: 28px;
          color: #333333;
        }
        .goods_MarketPrice{
          font-size: 24px;
          color: #999999;
        }
        .goods_pointsPrice{
          margin-top: 30px;
          font-size: 40px;
          color: #fb5920;
          span{
            font-size: 32px;
          }
        }
        .submitExchange{
          margin-top: 20px;
          width: 150px;
          line-height: 50px;
          background-color: #fb5920;
          border-radius: 25px;
          font-size: 28px;
          text-align: center;
          color: #ffffff;
        }
      }
    }
  }
}


</style>