<template>
  <HeadBack title="申请退款"/>
  <div class="apply-for-refund">
    <div class="van-hairline--bottom">退款申请</div>
    <div class="apply-for-refund-time">
      <div>支付时间：</div>
      <div>{{ payTime }}</div>
    </div>
    <div class="apply-for-refund-amount">
      <div>支付金额：</div>
      <div>￥{{ amount }}</div>
    </div>
  </div>
  <div class="apply-for-refund">
    <div class="proof">补充退款凭证 <span>*</span></div>
    <div class="Up-loader-image">
      <Uploader v-model="fileList" :max-count="5" :uploadText="`${fileList.length}/5`" image-fit="cover"
                multiple></Uploader>
    </div>
  </div>
  <div class="feedback_submit">
    <Button :loading="isLoading" class="bigButton" loading-text="上传中" type="primary" @click="applyNow">立 即 申 请
    </Button>
  </div>
</template>

<script lang="ts" setup>
import HeadBack from "@/components/header.vue";
import {Button, showToast, Uploader} from "vant";
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import {recordGetSTS, refundSave} from "@/API/pay";
import OSS from 'ali-oss'
import Compressor from "compressorjs";

const fileList = ref<object[]>([]);
const ImageList = ref<object[]>([]);
const isLoading = ref<boolean>(false)
const router = useRouter();

const amount = ref<number | string | string[]>(history.state.amount);
const payTime = ref<number | string | string[]>(history.state.payTime);
const amountID = ref<number | string | string[]>(history.state.id);

//获取oss临时凭证
let client: any = '';
const getOSS = () => {
  recordGetSTS().then(res => {
    let sts = res.data.sts;
    client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: sts.accessKeyId,
      accessKeySecret: sts.accessKeySecret,
      stsToken: sts.securityToken,
      bucket: sts.bucket,
      refreshSTSToken: async () => {
        // 向您搭建的STS服务获取临时访问凭证。
        const info = await recordGetSTS();
        return {
          accessKeyId: info.data.sts.accessKeyId,
          accessKeySecret: info.data.sts.accessKeySecret,
          stsToken: info.data.sts.securityToken,
        };
      },
      // 刷新临时访问凭证的时间间隔，单位为毫秒。
      refreshSTSTokenInterval: new Date(sts.expiration).valueOf() - new Date().valueOf(),
    })
  })
}

//压缩图片大小
const compressorImgDimension = (val: any, fileNames: string) => {
  new Compressor(val.file, {
    quality: 1,
    maxWidth: 1280,
    maxHeight: 1280,
    success: function (result: any) {
      val.file = new File([result], result.name, {type: result.type});
      if (val.file.size > 1024 * 1024) {
        compressorImg(val, fileNames, 0.7)
      } else if (val.file.size > 512 * 1024) {
        compressorImg(val, fileNames, 0.8)
      } else if (val.file.size > 200 * 1024) {
        compressorImg(val, fileNames, 0.9)
      } else {
        compressorImg(val, fileNames, 1)
      }
    }
  })
};
//压缩质量
const compressorImg = (val: any, fileNames: string, quality: number) => {
  new Compressor(val.file, {
    quality: quality,
    success: function (result: any) {
      val.file = new File([result], result.name, {type: result.type});
      upLoadOss(val, fileNames)
    }
  })
};
//OSS上传图片
const upLoadOss = (val: any, fileNames: string) => {
  client.put(`dxe/pic/${fileNames}`, val.file).then((res: any) => {
    ImageList.value.push(res.url)
    if (ImageList.value.length === fileList.value.length) {
      upRefundSave()
    }
  });
};
const upLoad = () => {
  fileList.value.forEach((res: any, index: number) => {
    let point = res.file.name.lastIndexOf('.');
    let suffix = res.file.name.substr(point);
    let date = new Date().valueOf();
    let fileNames = `${date}-${index}-${suffix}`;
    compressorImgDimension(res, fileNames)
  })
}
//立即申请
const applyNow = () => {
  if (fileList.value.length !== 0) {
    upLoad()
    isLoading.value = true;
  } else {
    showToast('图片最少为一张');
  }
}
// 上传图
const upRefundSave = () => {
  let data = {
    rechargeRecordId: amountID.value,
    urls: ImageList.value
  }
  refundSave(data).then(res => {
    if (!!res) {
      router.replace({path: '/PAYdetail', state: {id: res.data.id}})
    } else {
      isLoading.value = false;
    }
  })
}
onBeforeMount(() => {
  getOSS()
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/public.scss";

.apply-for-refund {
  margin: 0 24px 20px;
  padding: 40px 30px;
  padding-top: 0;
  font-size: 28px;
  color: #333333;
  background-color: #ffffff;
  border-radius: 24px;

  > div {
    line-height: 62px;
  }

  > div:first-child {
    line-height: 100px;
  }

  > div:first-child {
    padding-left: 17px;
    position: relative;
    font-weight: bolder;
  }

  > div:first-child::before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: "";
    width: 6px;
    height: 30px;
    background-color: #ff9c00;
    border-radius: 3px;
  }

  .apply-for-refund-time {
    padding-top: 20px;
  }

  .apply-for-refund-time, .apply-for-refund-amount {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:first-child {
      color: #999999;
    }
  }

  .Up-loader-image {
    :deep(.van-uploader__upload) {
      background-color: #ffffff;
      border-radius: 8px;
      border: dashed 1px #dddddd;
    }

    :deep(.van-uploader__upload-text) {
      margin-top: 0;
      line-height: 50px;
      font-size: 20px;
      color: #999999;
    }

    :deep(.van-image,.van-uploader__preview) {
      border-radius: 8px;
    }

    :deep(.van-uploader__preview-delete) {
      border-radius: 0 8px 0 8px;
    }
  }

  .apply-for-refund-amount {
    > div:last-child {
      font-size: 36px;
      color: #ff9c00;
    }
  }
}

.proof {
  span {
    font-size: 28px;
    color: #ff9c00;
  }
}
</style>