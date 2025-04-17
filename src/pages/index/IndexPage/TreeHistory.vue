<template>
  <view class="history-container">
    <view class="page-header">
      <text class="page-title">我的倾诉</text>
    </view>
    
    <view class="history-list">
      <view class="history-item" v-for="(item, index) in historyList" :key="index">
        <view class="time">{{ item.time }}</view>
        <view class="content">{{ item.content }}</view>
        <image class="flower-decoration" src="/static/index/flower.png" mode="aspectFit"></image>
      </view>
    </view>
    
    <view class="bottom-text">— 到底了 —</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟历史记录数据
const historyList = ref([
  {
    time: '2025-04-07 15:56:19',
    content: '111'
  },
  {
    time: '2025-04-07 11:46:17',
    content: '哈哈哈哈'
  }
]);
</script>

<style scoped>
.history-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #90EE90, #32CD32);
  padding: 20rpx;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88rpx;
  margin-bottom: 30rpx;
}

.page-title {
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.history-item {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20rpx;
  padding: 20rpx;
  position: relative;
  overflow: hidden;
}

.time {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10rpx;
}

.content {
  font-size: 28rpx;
  color: #ffffff;
  line-height: 1.6;
}

.flower-decoration {
  position: absolute;
  right: 10rpx;
  bottom: 10rpx;
  width: 60rpx;
  height: 60rpx;
  opacity: 0.6;
}

.bottom-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}
</style>