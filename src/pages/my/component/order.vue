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
    <view class="order-list" v-if="currentTab === 0 || currentTab === 1">
      <view class="order-item">
        <view class="order-status">已超时</view>
        <view class="order-number">订单号 O17441600662349</view>
        
        <view class="order-content">
          <view class="order-amount">1800星币</view>
          <view class="order-info">
            <text class="total-label">合计金额:</text>
            <text class="total-amount">¥18.00</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 其他状态显示空提示 -->
    <view class="order-list" v-if="currentTab === 2">
      <view class="empty-tip">暂无已付款订单</view>
    </view>
    <view class="order-list" v-if="currentTab === 3">
      <view class="empty-tip">暂无待收货订单</view>
    </view>
    <view class="order-list" v-if="currentTab === 4">
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

.order-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.order-status {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.order-number {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 30rpx;
}

.order-content {
  border-top: 1px solid #f5f5f5;
  padding-top: 20rpx;
}

.order-amount {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.order-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10rpx;
}

.total-label {
  font-size: 24rpx;
  color: #666;
  margin-right: 10rpx;
}

.total-amount {
  font-size: 28rpx;
  color: #ff6b9d;
  font-weight: bold;
}

.order-time {
  font-size: 24rpx;
  color: #999;
  text-align: right;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 40rpx 0;
}
</style>