<template>
  <Collapse v-if="isView===1" v-model="activePeople" accordion class="Insurance-guide">
    <CollapseItem name="1" title="1、事故现场">
      <li>拍摄事故现场并拨打122（交警）或110(公安)报警处理现场；</li>
      <li>向站点报备事故情况并同步4006-616-626报案；</li>
      <li>拨打120或自行前往医院就诊；</li>
    </CollapseItem>
    <CollapseItem name="2" title="2、费用垫付">
      <li>事故责任未确定前由双方自行协商垫付费用，若未协商一致，按照各自50%垫付费用；</li>
      <li>事故责任明确后按照责任比例各自垫付费用；</li>
      <li>机动车事故有责方对三者人伤医疗费用可由交强险优先垫付部分金额（垫付所需资料由交强险公司要求为准）；</li>
    </CollapseItem>
    <CollapseItem name="3" title="3、责任划分">
      <li>配合交警按照交通事故处理流程划分责任（争取有利责任）；</li>
      <li>对责任划分存在异议的，需在责任书送达之日起3日内提出书面复核申请；</li>
    </CollapseItem>
    <CollapseItem name="4" title="4、责任划分">
      <li>优先选择二级以上的医疗机构；</li>
      <li>优先选择基本医疗保险范畴内的药品及诊疗项目；</li>
      <li>住院期间杜绝挂床行为；</li>
    </CollapseItem>
    <CollapseItem name="5" title="5、办理出院">
      <li>提醒医生出具医嘱建议；</li>
      <li>保留材料：发票报销联、费用清单、出院证及住院病历复印件（盖医院鲜章）；</li>
    </CollapseItem>
    <CollapseItem name="6" title="6、涉及伤残">
      <li>准备鉴定所需资料：伤者本人和其身份证原件、出院证明、住院病历、所有就诊期间影像资料（X片、DR片、CT片、MRI片）；</li>
      <li>选择具有资质的鉴定所鉴定并保存鉴定发票；</li>
      <li>及时通知站点并报备对接理赔员；</li>
    </CollapseItem>
    <CollapseItem name="7" title="7、理赔资料收集">
      <p>所需资料：</p>
      <li>交通事故认定书、双方身份证复印件；</li>
      <li>门诊：发票报销联、急诊病例、门诊病情诊断证明书、检查报告、处方笺；</li>
      <li>住院：发票报销联、费用清单、出院证及住院病历复印件（需盖医院鲜章）；</li>
      <li>涉及误工：劳动合同、银行流水、收入减少证明、完税证明；</li>
      <li>死亡：死亡证明、火化证（土葬证明）、户籍注销证明、尸检报告；</li>
    </CollapseItem>
    <CollapseItem name="8" title="8、保险理赔">
      <li>整理提交理赔资料，等待保险公司审核、结案后支付赔款；</li>
    </CollapseItem>
    <CollapseItem name="9" title="9、事故回访">
      <li>接听回访电话，客观评价协理服务；</li>
    </CollapseItem>
  </Collapse>
  <Collapse v-else v-model="activePhysical" accordion>
    <CollapseItem name="1" title="1、事故现场证据拍照">
      <li>拍摄事故现场并拨打122（交警）或110(公安)报警处理现场；</li>
      <li>向站点报备事故情况并同步“4006-616-626”报案；</li>
    </CollapseItem>
    <CollapseItem name="2" title="2、责任划分">
      <li>配合交警按照交通事故处理流程划分责任（争取有利责任）；</li>
      <li>对责任划分存在异议的，需在责任书送达之日起3日内提出书面复核申请；</li>
    </CollapseItem>
    <CollapseItem name="3" title="3、保险公司财产损失确认">
      <li>通知保险公司定损人员确定财产损失；</li>
    </CollapseItem>
    <CollapseItem name="4" title="4、理赔资料收集">
      <p>所需资料：</p>
      <li>事故现场照片，财产损失照片；</li>
      <li>损失清单；</li>
      <li>票据（维修发票、赔偿支付凭证等）；</li>
      <li>事故责任认定书（涉及三者损失）；</li>
      <li>授权转款委托书（涉及支付第三方）;</li>
    </CollapseItem>
    <CollapseItem name="5" title="5、保险理赔">
      <li>将上述资料提交保险公司，由保险公司审核确认支付结案，具体支付时间以保险公司为准;</li>
    </CollapseItem>
    <CollapseItem name="6" title="6、事故回访">
      <li>接听回访电话，客观评价协理服务；</li>
    </CollapseItem>
  </Collapse>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Collapse, CollapseItem} from 'vant';

const props = defineProps<{
  isView: number
}>()
const activePeople = ref<number>(1);
const activePhysical = ref<number>(1);</script>

<style lang="scss" scoped>
.Insurance-guide {
  :deep(.van-cell) {
    padding-right: 40px;
  }
}

:deep(.van-cell__title) {
  color: #ff9c00;
}

:deep(.van-cell__right-icon) {
  font-size: 20px;
}
</style>