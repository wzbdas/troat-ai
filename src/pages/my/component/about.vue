<template>
  <view class="about-container">
    <!-- 应用图标 -->
    <view class="app-icon">
      <image src="../../../img/8.png" mode="aspectFill"></image>
    </view>
    
    <!-- 应用名称和描述 -->
    <view class="app-info">
      <text class="app-name">爱占星</text>
      <text class="app-desc">入门级占星爱好者，愿用技术与你共进</text>
    </view>
    
    <!-- 版本信息 -->
    <view class="info-group">
      <view class="info-item">
        <text class="info-label">版本</text>
        <text class="info-value">V6.11.65</text>
      </view>
      <view class="info-item">
        <text class="info-label">参数版本</text>
        <text class="info-value">17</text>
      </view>
    </view>
    
    <!-- 协议和政策 -->
    <view class="info-group">
      <view class="info-item link">
        <text class="info-label" @tap="goToUserAgreement">用户服务协议</text>
        <text class="arrow">›</text>
      </view>
      <view class="info-item link" @tap="goPolicy">
        <text class="info-label">隐私政策</text>
        <text class="arrow">›</text>
      </view>
    </view>
    
    <!-- 其他信息 -->
    <view class="info-group">
      <view class="info-item link" @tap="goToInstruction">
        <text class="info-label" >介绍 & 鸣谢</text>
        <text class="arrow">›</text>
      </view>
      <view class="info-item link" @tap="goPlan">
        <text class="info-label">开发计划</text>
        <text class="arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 添加跳转方法
const goToUserAgreement = () => {
  uni.navigateTo({
    url: '/pages/my/component/user'
  });
};
// 添加新的跳转方法
const goToInstruction = () => {
  uni.navigateTo({
    url: '/pages/my/component/instruction'
  });
};
const goPolicy = () => {
  uni.navigateTo({
    url: '/pages/my/component/Policy'
  });
};
const goPlan = () => {
  uni.navigateTo({
    url: '/pages/my/component/plan'
  });
};
</script>

<style>
.about-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 40rpx 0;
}

.app-icon {
  width: 180rpx;
  height: 180rpx;
  margin: 0 auto 30rpx;
  border-radius: 30rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.app-icon image {
  width: 100%;
  height: 100%;
}

.app-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}

.app-name {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.app-desc {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  padding: 0 40rpx;
}

.info-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 30rpx 30rpx;
  overflow: hidden;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1px solid #f0f2f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 32rpx;
  color: #333;
}

.info-value {
  font-size: 32rpx;
  color: #999;
}

.link .info-label {
  flex: 1;
}

.arrow {
  font-size: 40rpx;
  color: #999;
}
</style>
