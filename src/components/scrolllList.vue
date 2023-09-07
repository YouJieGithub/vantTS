<template>
  <div class="scroll-list">
    <div
        ref="scrollListContent"
        class="scroll-list-content"
    >
      <div v-for="(item, index) in props.list" :key="index" class="scroll-list-group"
           @click="router.push({path:item.url})">
        <font-svg :icon="item.icon" class="scroll-list-item-img"/>
        <p class="scroll-list-item-text">{{ item.title }}</p>
      </div>
    </div>
    <div class="scroll-list-indicator">
      <div
          ref="scrollListIndicatorBar"
          class="scroll-list-indicator-bar"
      >
        <span class="scroll-list-indicator-slider"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import fontSvg from '@/components/fontSvg.vue';
import {nextTick, onBeforeUnmount, onMounted, reactive, ref, watch,} from "vue";
import {useRouter} from "vue-router/dist/vue-router";

interface Props {
  list: any;
  indicator: boolean;
  indicatorColor: string;
  indicatorActiveColor: string;
  indicatorWidth: string;
  indicatorBottom: string;
  icon: string;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  indicator: true,
  indicatorColor: '#f2f2f2',
  indicatorActiveColor: '#3c9cff',
  indicatorWidth: '48px',
  indicatorBottom: '10px',
  icon: 'icon',
  name: 'name'
})
const router = useRouter();
const width = ref<String>("");
const height = ref<String>("");
const {indicatorWidth, indicatorBottom, indicator} = props;
watch(
    () => [indicatorWidth, indicatorBottom],
    (newVal) => {
      console.log(newVal);
      const _width = newVal[0].includes("px") ? newVal[0] : newVal[0] + "px";
      const _height = newVal[1].includes("px") ? newVal[1] : newVal[1] + "px";
      width.value = _width;
      height.value = _height;
    },
    {immediate: true}
);
const scrollListContent = ref<any>(null)
const scrollListIndicatorBar = ref<any>(null)
const state = reactive({
  isScrollBar: false,
});

onMounted(() => {
  nextTick(() => {
    state.isScrollBar = hasScrollbar();
    if (!indicator || !state.isScrollBar) return;
    scrollListContent.value.addEventListener("scroll", handleScroll);
  });
});

onBeforeUnmount(() => {
  if (!indicator || !state.isScrollBar) return;
  // 页面卸载，移除监听事件
  scrollListContent.value.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  /**
   * 使用滚动比例来实现同步滚动
   * tips: 这里时一道数学题， 不同的可以把下面的几个参数都打印处理看看
   * 解析一下 这里的实现
   * state.scrollListContent.scrollWidth  内容区域的宽度
   * state.scrollListContent.clientWidth  当前内容所占的可视区宽度
   * state.scrollListIndicatorBar.scrollWidth  指示器的宽度
   * state.scrollListIndicatorBar.clientWidth  当前指示器所占的可视区宽度
   *
   * 内容区域的宽度 - 当前内容所占的可视区宽度 = 内容区域可滚动的最大距离
   * 指示器的宽度 - 当前指示器所占的可视区宽度 = 指示器可滚动的最大距离
   *
   * 内容区域可滚动的最大距离 / 指示器可滚动的最大距离 = 滚动比例 (scale)
   *
   * 最后通过滚动比例 来算出 指示器滚动的 距离 （state.scrollListIndicatorBar.scrollLeft）
   *
   * 指示器滚动的距离 = 容器滚动的距离 / 滚动比例 （对应下面的公式）
   *
   * state.scrollListIndicatorBar.scrollLeft = state.scrollListContent.scrollLeft / scale
   */

  const scale =
      (scrollListContent.value.scrollWidth -
          scrollListContent.value.clientWidth) /
      (scrollListIndicatorBar.value.scrollWidth -
          scrollListIndicatorBar.value.clientWidth);

  scrollListIndicatorBar.value.scrollLeft =
      scrollListContent.value.scrollLeft / scale;
}

const hasScrollbar = () => {
  return (
      scrollListContent.value.scrollWidth >
      scrollListContent.value.clientWidth ||
      scrollListContent.value.offsetWidth >
      scrollListContent.value.clientWidth
  );
}
</script>

<style lang="scss" scoped>
.scroll-list {
  overflow: hidden;

  .scroll-list-content {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    box-sizing: content-box;
    overflow-x: auto;
    overflow-y: hidden;
    user-select: none;
    // white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  /*滚动条整体样式*/
  .scroll-list-content::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .scroll-list-group {
    flex: 1 0 auto;
    padding: 0 32px;
    text-align: center;

    p {
      font-size: 28px;
      color: #333333;
    }

    .scroll-list-group:nth-child(2n) {
      margin-bottom: 0;
    }
  }

  .scroll-list-item {
    margin-bottom: 16px;
    text-align: center;
    width: calc(100% / 4);

    .scroll-list-item-img {
      width: 44px;
      height: 44px;
      object-fit: cover;
    }

    .scroll-list-item-text {
      display: block;
    }

    .scroll-list-item:nth-child(n + 5) {
      margin-bottom: 0;
    }
  }

  .scroll-list-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; // 禁用滑动指示灯时 滑块滚动
    .scroll-list-indicator-bar {
      padding-top: 40px;
      width: 48px; // 指示器的默认宽度
      overflow-y: hidden;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }

    /*滚动条整体样式*/
    .scroll-list-indicator-bar::-webkit-scrollbar {
      height: 6px;
      width: 48px;
    }

    /* 滚动条里面小滑块 样式设置 */
    .scroll-list-indicator-bar::-webkit-scrollbar-thumb {
      border-radius: 3px; /* 滚动条里面小滑块 - radius */
      background: rgb(60, 237, 237); /* 滚动条里面小滑块 - 背景色 */
    }

    /* 滚动条里面轨道 样式设置 */
    .scroll-list-indicator-bar::-webkit-scrollbar-track {
      border-radius: 3px; /* 滚动条里面轨道 - radius */
      background: rgb(242, 242, 242); /* 滚动条里面轨道 - 背景色 */
    }

    .scroll-list-indicator-slider {
      height: 6px;
      min-width: 120px;
      display: block;

    }
  }

  .scroll-list-indicator::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
