<template>
  <view class="zxx-topbox">
    <view class="zxx-topbox-con">
      <text class="title">自己-示例</text>
      <view class="right-actions">
        <text class="action-item">切换<uni-icons type="arrowright" size="14"></uni-icons></text>
        <text class="action-item">详情<uni-icons type="arrowdown" size="14"></uni-icons></text>
      </view>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="zxx-tab">
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
      <view class="h5-tab-container">
        <view class="h5-tab-wrapper">
          <view 
            v-for="(item, index) in tabItems1" 
            :key="index"
            :class="['h5-tab-item', { 'h5-tab-active': currentH5Tab === index }]"
            @click="handleH5TabClick(index)"
            :style="{ backgroundColor: currentH5Tab === index ? 'pink' : 'transparent' }"
          >
            {{ item }}
          </view>
        </view>
      </view>
      
    </view>
    <view class="h5-component-container">
        <Taro v-if="currentH5Tab === 0" />
        <Test v-else-if="currentH5Tab === 1" />
        <Spread v-else-if="currentH5Tab === 2" />
        <Mean v-else-if="currentH5Tab === 3" />
        <Tutorial v-else-if="currentH5Tab === 4" />
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
import Test from './component/zx-test.vue'
import Spread from './component/zx-spread.vue'
import Mean from './component/zx-mean.vue'
import Tutorial from './component/zx-tutorial.vue'


const tabItems = [
  '22张大阿卡那牌',
  '14张权杖牌',
  '14张圣杯牌',
  '14张宝剑牌',
  '14张星币牌'
]
const tabItems1 = [
  '塔罗牌',
  '测试',
  '牌阵',
  '牌意',
  '教程'
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

.zxx-topbox-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  height: 80rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.right-actions {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 28rpx;
}

.action-item {
  display: flex;
  align-items: center;
  margin-left: 30rpx;
}

.zxx-tab {
  padding: 0 30rpx;
  width: 100%;
  overflow-x: auto;
}

.tab-list {
  display: flex;
  align-items: center;
  height: 80rpx;
  border-bottom: 1rpx solid #f5f5f5;
  width: max-content;
  min-width: 100%;
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
  border: 1rpx solid red;
}

.h5-tab-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20rpx;
  background: #fff;
}

.h5-tab-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20rpx;
  max-width: 900rpx;
}

.h5-component-container {
  width: 100%;
  height: 100%;
  background-color: #9bd8ee;
}
.h5-tab-active {
  background-color: pink;
}
</style>