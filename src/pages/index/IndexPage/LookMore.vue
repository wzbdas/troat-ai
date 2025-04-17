<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <text class="back-btn" @click="goBack">返回</text>
      <text class="title">今日运势</text>
      <view class="date-picker">
        <picker mode="date" :value="currentDate" @change="onDateChange">
          <text>{{ currentDate }}</text>
        </picker>
      </view>
    </view>

    <!-- 用户信息卡片 -->
    <view class="user-card">
      <image class="avatar" src="../../../static/index/profile.jpg"></image>
      <view class="user-info">
        <text class="username">张三</text>
        <text class="birth-info">1995年8月8日 12:30</text>
      </view>
    </view>

    <!-- 运势指数卡片 -->
    <view class="fortune-card">
      <text class="card-title">运势指数</text>
      <view class="progress-list">
        <view class="progress-item" v-for="(item, index) in fortuneItems" :key="index">
          <view class="progress-label">
            <text>{{ item.label }}</text>
            <text class="progress-value">{{ item.value }}%</text>
          </view>
          <view class="progress-bar">
            <view class="progress-fill" :style="{ width: item.value + '%', backgroundColor: item.color }"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 幸运物信息卡片 -->
    <view class="lucky-card">
      <text class="card-title">今日幸运</text>
      <view class="lucky-items">
        <view class="lucky-item">
          <text class="item-label">幸运色</text>
          <text class="item-value">粉色</text>
        </view>
        <view class="lucky-item">
          <text class="item-label">幸运数字</text>
          <text class="item-value">6</text>
        </view>
        <view class="lucky-item">
          <text class="item-label">吉利方位</text>
          <text class="item-value">东南</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 日期选择
const currentDate = ref(new Date().toISOString().split('T')[0])
const onDateChange = (e: any) => {
  currentDate.value = e.detail.value
}

// 运势指数数据
const fortuneItems = ref([
  { label: '综合运势', value: 88, color: '#FFB6C1' },
  { label: '事业运势', value: 92, color: '#87CEEB' },
  { label: '感情运势', value: 75, color: '#98FB98' },
  { label: '财运指数', value: 85, color: '#DDA0DD' },
  { label: '健康指数', value: 95, color: '#F0E68C' },
  { label: '学习指数', value: 82, color: '#FFA07A' }
])
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.back-btn {
  font-size: 28rpx;
  color: #666;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.date-picker {
  font-size: 28rpx;
  color: #666;
}

.user-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx 0;
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 20rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.birth-info {
  font-size: 24rpx;
  color: #999;
}

.fortune-card, .lucky-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx 0;
}

.card-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  display: block;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.progress-item {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
  font-size: 26rpx;
}

.progress-value {
  color: #666;
}

.progress-bar {
  height: 16rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.lucky-items {
  display: flex;
  justify-content: space-between;
}

.lucky-item {
  text-align: center;
}

.item-label {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 10rpx;
  display: block;
}

.item-value {
  font-size: 30rpx;
  color: #333;
  font-weight: bold;
}
</style>