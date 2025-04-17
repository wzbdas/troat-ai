<template>
  <view class="order-container">
    <!-- 订单状态切换栏 -->
    <view class="tab-bar">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list" v-if="currentTab === 0">
      <!-- 全部订单 -->
      <view class="empty-tip" v-if="!hasOrders">仅供娱乐</view>
    </view>
    <view class="order-list" v-if="currentTab === 1">
      <!-- 待付款 -->
      <view class="empty-tip">暂无待付款订单</view>
    </view>
    <view class="order-list" v-if="currentTab === 2">
      <!-- 已付款 -->
      <view class="empty-tip">暂无已付款订单</view>
    </view>
    <view class="order-list" v-if="currentTab === 3">
      <!-- 待收货 -->
      <view class="empty-tip">暂无待收货订单</view>
    </view>
    <view class="order-list" v-if="currentTab === 4">
      <!-- 已完成 -->
      <view class="empty-tip">暂无已完成订单</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['全部', '待付款', '已付款', '待收货', '已完成']
const currentTab = ref(0)
const hasOrders = ref(false)

const switchTab = (index: number) => {
  currentTab.value = index
}
</script>

<style>
.order-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.tab-bar {
  display: flex;
  background-color: #fff;
  padding: 20rpx 0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #ff6b9d;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #ff6b9d;
}

.order-list {
  padding: 20rpx;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 40rpx 0;
}
</style>