<template>
<div class="rule">
  <div class="rule_HeadBack">
    <NavBar class="nav" left-arrow @click-left="() => router.back()"/>
  </div>
  <div class="rule_title">
    <img src="@/assets/image/integralRule_title.png" alt="">
  </div>
  <div class="rule_body">
    <div class="rule_content">
      <div>活动时间</div>
      <div>2023-12-01起</div>
    </div>
    <div class="rule_content">
      <div>活动介绍</div>
      <div>
        <ol>
          <li>1、骑手每配送完成1单，即可获得1点积分，单量以店小二显示为准；</li>
          <li>2、后续会有积分倍增计划；</li>
          <li>3、邀请1个人入职，奖励邀请人500积分；被邀请人在职满1个月，奖励邀请人200积分；被邀请人在职满3个月，奖励邀请人500积分；被邀请人在职满6个月，奖励邀请人800积分。</li>
          <li>4、骑手在职满6个月奖励积分1000分，在职满12个月奖励2000积分，在职满24个月奖励5000积分。</li>
          <li>5、兑换时，拥有相应积分需大于等于兑换礼品的积分，方可兑换;兑换礼品后，系统会自动扣除相应的积分，若有剩余积分则继续累积在骑手本人账户中，可下次进行积分兑换；</li>
          <li>6、积分清零时间:积分兑换累计到2020.03.31日，积分如不兑拉则清零，重新开始累计；</li>
          <li>7、骑手本人离职，积分自动清零，不得转让积分给他人。</li>
          <li>8、积分会在积分生成的次年年底进行清零。比如，在2023年内生成的积分，会在2024年的12月31日之后进行清零。</li>
        </ol>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {NavBar} from "vant";
import {useRouter} from "vue-router";

const router=useRouter()
</script>

<style scoped lang="scss">
.rule{
  height: 100%;
  position: relative;
  background: url("@/assets/image/integralRule.png") no-repeat;
  .rule_HeadBack{
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
  .rule_title{
    padding-top: 60px;
    text-align: center;
    img{
      height: 47px;
    }
  }
  .rule_body{
    margin: 0 24px;
    padding: 40px 24px 14px 30px;
    background-color: #ffffff;
    border-radius: 24px;
    font-family: SourceHanSansCN-Regular;
    font-size: 24px;
    color: #c06f48;
    .rule_content{
      div:first-child{
        width: 164px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        background: url("@/assets/image/rule.png") no-repeat;
        background-size: 100%;
      }
      div:last-child{
        margin: 30px 0 40px 9px;
        ol{
          list-style: none !important;
        }
      }
    }
  }
}

</style>