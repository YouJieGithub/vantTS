<template>
  <HeadBack :title="title"></HeadBack>
  <Form>
    <CellGroup>
      <Field v-model="username" input-align="right" label="持卡人：" readonly/>
      <Field v-model.trim.number="card" input-align="right" label="卡号：" maxlength="20" placeholder="请输入银行卡号"
             @blur="getAccountBank"/>
      <Field v-show="isAccountBank" v-model="accountbank" input-align="right" label="开户行：" readonly/>
      <Field v-model="cardsite" input-align="right" label="支行地址：" placeholder="请输入支行地址"/>
    </CellGroup>
    <cell :border="false" style="background-color: #f7f7ff;">
      <p>
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-a-tishi_huaban1fuben51"></use>
        </svg>
        <span>请绑定本人银行卡</span></p>
    </cell>
    <div class="add-salary-card">
      <Button class="bigButton" type="primary" @click="onSubmitBank"><span class="button-text">确认</span></Button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import HeadBack from '@/components/header.vue';
import {Button, Cell, CellGroup, Field, Form, showConfirmDialog, showNotify, showToast} from 'vant';
import {bandSave, bankBandQuery, bankInfo} from "@/API/bank";
import {computed, ref} from "vue";
import {useStore} from "@/store";
import {useRoute, useRouter} from "vue-router";
/**
 * BankReg   银行卡正则验证
 * throttle  函数节流
 */
import {BankReg} from '@/utils/RegIndex/isBank';
import {throttle} from "@/utils";

const store = useStore();
const route = useRoute();
const router = useRouter();
const cardId = ref<string>('');
const username = computed(() => store.state.userInfoModule.username);
const card = ref<number | string>('');
const cardsite = ref<string>('');
const accountbank = ref<string>('');
const bankProvince = ref<string>('');
const isAccountBank = ref<boolean>(false);
const title = ref<string>('添加银行卡');

const getBankBandQuery = () => {
  bankBandQuery().then(res => {
    card.value = res.data.info.bankCardNumber;
    accountbank.value = res.data.info.bankAccount;
    bankProvince.value = res.data.info.bankProvince;
    cardsite.value = res.data.info.bankAddress;
    isAccountBank.value = true;
  })
};

const getAccountBank = () => {
  if (!!card.value && BankReg.isBank(String(card.value))) {
    bankInfo({bankCardNumber: card.value}).then(res => {
      if (!res) {
        isAccountBank.value = false;
      } else {
        isAccountBank.value = true;
        accountbank.value = res.data.bank;
        bankProvince.value = res.data.province;
      }
    })
  } else {
    isAccountBank.value = false;
    accountbank.value = '';
    bankProvince.value = '';
  }
};

if (Number(route.query.flag) === 1) {
  getBankBandQuery()
  title.value = '修改银行卡';
}

const onSubmitBank = () => {
  if (!card.value) {
    showNotify({type: 'danger', background: '#999999', message: '请填写银行卡号'});
    return;
  }
  if (!cardsite.value) {
    showNotify({type: 'danger', background: '#999999', message: '请填写银行卡地址'});
    return;
  }
  if (!BankReg.isBank(String(card.value))) {
    return;
  }
  showConfirmDialog({
    width: 'max-content',
    title: '提示',
    message: '请仔细核对本人银行卡信息\n确认无误再提交,以免影响工资发放',
    confirmButtonText: '提交',
    confirmButtonColor: '#ff9c00',
    cancelButtonColor: '#999999',
    className: 'dialog-confirm'
  }).then(() => {
    let data = {
      bankCardNumber: card.value,
      bankAccount: accountbank.value,
      bankProvince: bankProvince.value,
      bankAddress: cardsite.value
    };
    bandSave(data).then(res => {
      showToast({message: res.message, onClose: () => router.back()});
    })
  })
};

throttle(onSubmitBank, 1000)

</script>

<style lang="scss">
.dialog-confirm {
  .van-dialog__header {
    font-weight: bolder;
  }
}
</style>

<style lang="scss" scoped>
p {
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ee7e2b;

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    margin-left: 10px;
  }
}

.add-salary-card {
  margin-top: 148px;
  text-align: center;

  .button-text {
    font-size: 28px;
    letter-spacing: 14px;
    color: #ffffff;
  }
}
</style>