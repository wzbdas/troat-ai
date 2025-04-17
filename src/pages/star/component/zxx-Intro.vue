<template>
  <view class="card-container">
    <view class="button-group">
      <view class="button-item report-button" @tap="handleReport">
        <text class="icon">👥</text>
         <!-- #ifdef MP-WEIXIN -->
        <text>合牌报告</text>
          <!-- #endif -->
         <!-- #ifdef H5 -->
         <text>去测一测</text>
           <!-- #endif -->
      </view>
      <view class="button-item natal-button" @tap="handleNatal">
        <text class="icon">👤</text>
        <text>本命解读</text>
      </view>
    </view>
    <view class="info-section">
      <view class="info-text">
        <text class="info-icon">ⓘ</text>
        <text>什么是塔罗牌</text>
      </view>
      <view class="info-link" @tap="goToDetail">
        <text>查看说明</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const goToDetail = () => {
  uni.navigateTo({
    url: '/pages/star/zxx-detail'
  })
}

const handleReport = () => {
  // 处理合牌报告点击
  uni.showToast({
    title: '合牌报告功能开发中',
    icon: 'none'
  })
}

const handleNatal = () => {
  // 处理本命解读点击
  uni.showToast({
    title: '本命解读功能开发中',
    icon: 'none'
  })
}
</script>

<style scoped>
.card-container {
  background-color: #fff5f5;
  border-radius: 20rpx;
  padding: 30rpx;
  width: 90%;
  margin: 30rpx auto;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.button-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #ffffff;
}

.report-button {
  background-color: #d1b3ff;
}

.natal-button {
  background-color: #ffd700;
}

.icon {
  margin-right: 10rpx;
  font-size: 32rpx;
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
  font-size: 26rpx;
  color: #333;
}

.info-text {
  display: flex;
  align-items: center;
}

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32rpx;
  height: 32rpx;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 10rpx;
  font-size: 24rpx;
  color: #666;
}

.info-link {
  display: flex;
  align-items: center;
  color: #666;
}

.arrow {
  margin-left: 6rpx;
  font-size: 26rpx;
}
</style>