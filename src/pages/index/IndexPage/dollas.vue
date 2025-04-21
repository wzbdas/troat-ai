<template>
  <view class="container">
    <!-- 娃娃形象轮播图 -->
    <view class="doll-container">
      <swiper class="doll-swiper" circular  interval="3000" duration="500" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#f4b9c1">
        <swiper-item v-for="index in 4" :key="index">
          <image :src="`../../../static/index/w${index}.jpeg`" mode="aspectFit" class="doll-image"></image>
        </swiper-item>
      </swiper>
      <text class="doll-name">暖忆娃娃</text>
    </view>

    <!-- 欢迎语 -->
    <view class="welcome-text">
      <text>我感化为温暖的回忆，陪伴着你，当你感到忧愁时，让我来唤起你心中美好的回忆，给予你力量💖</text>
    </view>

    <!-- 倾诉输入框 -->
    <view class="confession-box">
      <textarea
        v-model="confessionText"
        class="confession-input"
        placeholder="写下烦恼，让我来封印它~（200以内）"
        maxlength="200"
        @input="handleInput"
      ></textarea>
      <text class="word-count">{{ confessionText.length }}/200</text>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-btn" @click="submitConfession">倾诉</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 导航到我的倾诉页面
const navigateToMyConfessions = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/MyConfessions'
  })
}

// 倾诉文本
const confessionText = ref('')

// 处理输入
const handleInput = (e: any) => {
  confessionText.value = e.detail.value
}

// 提交倾诉
const submitConfession = () => {
  if (!confessionText.value.trim()) {
    uni.showToast({
      title: '请输入您的烦恼',
      icon: 'none'
    })
    return
  }
  // TODO: 实现提交逻辑
  uni.showToast({
    title: '已收到您的倾诉',
    icon: 'success'
  })
  confessionText.value = ''
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #fbfaf8;
  padding: 20rpx;
  position: relative;
}


.doll-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40rpx 0;
}

.doll-swiper {
  width: 100%;
  height: 300rpx;
}

.doll-image {
  width: 300rpx;
  height: 300rpx;
  margin: 0 auto;
  display: block;
}

.doll-name {
  color: #aaa;
  font-size: 32rpx;
  margin-top: 20rpx;
}

.welcome-text {
  color: #aaa;
  text-align: center;
  padding: 30rpx;
  line-height: 1.6;
  font-size: 28rpx;
}

.confession-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 20rpx;
  margin: 30rpx 0;
  position: relative;
}

.confession-input {
  width: 100%;
  height: 300rpx;
  color: #aaa;
  font-size: 28rpx;
  padding: 20rpx;
  box-sizing: border-box;
}

.word-count {
  position: absolute;
  bottom: 10rpx;
  right: 20rpx;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
}

.submit-btn {
  background: #f4b9c1;
  color: #fff;
  text-align: center;
  padding: 25rpx;
  border-radius: 50rpx;
  margin: 40rpx 60rpx;
  font-size: 32rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.3);
}

.submit-btn:active {
  transform: scale(0.98);
}
</style>