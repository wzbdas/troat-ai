<template>
  <view class="zxx-topbox">
    <!-- #ifdef MP-WEIXIN -->
    <view class="zxx-tab">
      <scroll-view scroll-x="true" class="scroll-view">
        <view class="tab-list">
          <view 
            v-for="(item, index) in tabItems" 
            :key="index"
            :class="['tab-item', { active: currentTab === index }]"
            @tap="handleTabClick(index)"
          >
            {{ item }}
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 根据当前选中的tab显示对应组件 -->
    <view class="tab-content">
      <Dakn v-if="currentTab === 0" />
      <Rights v-else-if="currentTab === 1" />
      <Cups v-else-if="currentTab === 2" />
      <Swords v-else-if="currentTab === 3" />
      <Coins v-else-if="currentTab === 4" />
    </view>
    <!-- #endif -->
 
    <!-- #ifdef H5 -->

    <view class="h5-content">
      <view class="sticky-header">
      <view class="h5-tab-container">
        <view class="h5-tab-wrapper">
          <view 
            v-for="(item, index) in tabItems1" 
            :key="index"
            :class="['h5-tab-item', { 'h5-tab-active': currentH5Tab === index }]"
            @click="handleH5TabClick(index)"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    </view>
    <view class="h5-main-content">
        <view class="h5-component-container">
          <Taro v-if="currentH5Tab === 0" />
          <Spread v-else-if="currentH5Tab === 1" />
          <Mean v-else-if="currentH5Tab === 2" />
        </view>
      </view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue'
import Dakn from './component/zxx-Dakn.vue'
import Rights from './component/zxx-Rights.vue'
import Cups from './component/zxx-Cups.vue'
import Swords from './component/zxx-Swords.vue'
import Coins from './component/zxx-Coins.vue'
import Taro from './component/zx-taro.vue'
import Spread from './component/zx-spread.vue'
import Mean from './component/zx-mean.vue'


const tabItems = [
  '22张大阿卡那牌',
  '14张权杖牌',
  '14张圣杯牌',
  '14张宝剑牌',
  '14张星币牌'
]
const tabItems1 = [
  '塔圈',
  '牌阵',
  '牌意'
]
const currentTab = ref(0)


const handleTabClick = (index: number) => {
  currentTab.value = index
}

// 添加 H5 端 tab 状态控制
const currentH5Tab = ref(0)

const handleH5TabClick = (index) => {
  currentH5Tab.value = index
}


</script>

<style scoped>
.zxx-topbox {
  width: 100vw;
  background: #fff;
}

.zxx-tab {
  width: 100%;
  position: relative;
}

.scroll-view {
  width: 100%;
  white-space: nowrap;
}

.tab-list {
  display: inline-flex;
  align-items: center;
  height: 80rpx;
  border-bottom: 1rpx solid #f5f5f5;
  padding: 0 30rpx;
  padding-right: 60rpx; /* 增加右侧内边距，确保最后一项完全显示 */
}

.tab-item {
  position: relative;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #666;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: color 0.3s ease;
  flex-shrink: 0; /* 防止项目被压缩 */
}

.tab-item.active {
  color: #ff4c8d;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rpx;
  background: #ff4c8d;
  transition: all 0.3s ease;
}

/* 组件内容区域样式 */
.tab-content {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
  text-align: center;
  background: #f8f8f8;
  min-height: 500rpx;
}
/* H5 端 tab 样式 */
.h5-content {
  width: 100%;
  max-width: 1800rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
}

.sticky-header {
  position: sticfky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: #fff;
}

.h5-tab-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.h5-tab-wrapper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 30rpx;
  max-width: 1200rpx;
  width: 100%;
}

.h5-tab-item {
  padding: 16rpx 30rpx;
  font-size: 30rpx;
  color: #666;
  background-color: #f8f8f8;
  border-radius: 40rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
  min-width: 160rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
.h5-tab-item:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
}
.h5-tab-active {
  background-color: #ffd1e0 !important;
  color: #ff4c8d;
  font-weight: bold;
  transform: scale(1.05);
  box-shadow: 0 8rpx 20rpx rgba(255, 76, 141, 0.2);
}

.h5-main-content {
  flex: 1;
  width: 100%;
  overflow-y: auto;
}

.h5-component-container {
  width: auto;
  background-color: #f5f9fc;
  padding: 20rpx;
  border-radius: 12rpx; /* 添加容器圆角 */
  margin-top: 10rpx; /* 添加顶部间距 */
}
</style>