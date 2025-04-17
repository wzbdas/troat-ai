<template>
  <view class="tree-container">
    <!-- 顶部标题栏 -->
    <view class="page-header">
      <text class="page-title">树洞倾诉</text>
    </view>

    <!-- 欢迎语区域 -->
    <view class="welcome-section">
      <text class="welcome-title">嘿~亲爱的你 😊</text>
      <text class="welcome-text">当你来到这里，就像找到了一个只属于你的秘密基地。生活中那些或大或小的烦恼、快乐、困惑、梦想，都可以尽情地向我倾诉。</text>
    </view>

    <!-- 输入框区域 -->
    <view class="input-section">
      <textarea
        class="input-box"
        v-model="content"
        placeholder="写下想说的话，不要再憋着了～（200字以内）"
        maxlength="200"
        :show-count="true"
      />
    </view>

    <!-- 提交按钮 -->
    <view class="button-section">
      <button class="submit-btn" @click="handleSubmit">倾诉</button>
      <view class="my-confess">
        <uni-icons type="chatboxes" size="20" color="#ffffff" />
        <text @click="goToTreeHistory">我的倾诉</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref('');

const handleSubmit = () => {
  if (!content.value.trim()) {
    uni.showToast({
      title: '请输入内容',
      icon: 'none'
    });
    return;
  }
  // TODO: 实现提交逻辑
  console.log('提交内容:', content.value);
};

const goToTreeHistory = () => {
  uni.navigateTo({
    url: './TreeHistory',
    animationType: 'pop-in',
    animationDuration: 0
  })  
}
</script>

<style scoped>
.tree-container {
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

.welcome-section {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.welcome-title {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.welcome-text {
  font-size: 28rpx;
  color: #ffffff;
  line-height: 1.6;
}

.input-section {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.input-box {
  width: 100%;
  height: 300rpx;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.submit-btn {
  width: 80%;
  height: 88rpx;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 44rpx;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-confess {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding: 20rpx;
  color: #ffffff;
  font-size: 28rpx;
}
</style>