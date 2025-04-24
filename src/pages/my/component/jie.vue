<template>
  <view class="detail-container">
    <!-- 顶部导航 -->
    <!-- <view class="nav-bar">
      <view class="back-btn" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">塔罗解读详情</view>
      <view class="placeholder"></view>
    </view> -->
    
    <!-- 内容区域 -->
    <view class="content-area" v-if="record">
      <view class="detail-card">
        <!-- 问题 -->
        <view class="question-section">
          <view class="section-title">问题</view>
          <view class="question-content">{{ record.question || '未设置问题' }}</view>
        </view>
        
        <!-- 时间 -->
        <!-- <view class="time-section">
          <text class="time-label">解读时间：</text>
          <text class="time-value">{{ formatDate(record.create_time) }}</text>
        </view> -->
        
        <!-- 卡牌 -->
        <view class="cards-section" v-if="record.cards_drawn">
          <view class="section-title">抽取的卡牌</view>
          <view class="cards-content">{{ record.cards_drawn }}</view>
        </view>
        
        <!-- 解读结果 -->
        <view class="result-section">
          <view class="section-title">解读结果</view>
          <view class="result-content">{{ record.answer || '无解读结果' }}</view>
        </view>
      </view>
    </view>
    
    <!-- 加载状态 -->
    <view class="loading-state" v-else-if="isLoading">
      <text class="loading-text">加载中...</text>
    </view>
    
    <!-- 错误状态 -->
    <view class="error-state" v-else>
      <text class="error-text">无法加载解读详情</text>
      <button class="back-btn-large" @tap="goBack">返回列表</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 当前记录数据
const record = ref<any>(null);
const isLoading = ref(true);

// 从本地存储获取记录数据
const loadRecord = () => {
  try {
    const recordStr = uni.getStorageSync('currentTarotRecord');
    if (recordStr) {
      record.value = JSON.parse(recordStr);
      console.log('加载的记录:', record.value);
    } else {
      uni.showToast({
        title: '未找到记录数据',
        icon: 'none'
      });
    }
  } catch (e) {
    console.error('加载记录失败:', e);
    uni.showToast({
      title: '加载记录失败',
      icon: 'none'
    });
  } finally {
    isLoading.value = false;
  }
};

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return '未知时间';
  
  try {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  } catch (e) {
    return dateStr;
  }
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 页面加载时获取数据
onMounted(() => {
  loadRecord();
});
</script>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90rpx;
  padding: 0 30rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.placeholder {
  width: 60rpx;
}

.content-area {
  flex: 1;
  padding: 30rpx;
}

.detail-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6rpx;
  width: 8rpx;
  height: 30rpx;
  background-color: #ff6b9d;
  border-radius: 4rpx;
}

.question-section {
  margin-bottom: 30rpx;
}

.question-content {
  font-size: 34rpx;
  color: #333;
  line-height: 1.6;
  padding: 0 10rpx;
}

.time-section {
  display: flex;
  margin-bottom: 30rpx;
  padding: 0 10rpx;
}

.time-label {
  font-size: 28rpx;
  color: #666;
}

.time-value {
  font-size: 28rpx;
  color: #333;
}

.cards-section {
  margin-bottom: 30rpx;
}

.cards-content {
  font-size: 30rpx;
  color: #333;
  line-height: 1.6;
  padding: 0 10rpx;
}

.result-section {
  margin-bottom: 20rpx;
}

.result-content {
  font-size: 30rpx;
  color: #333;
  line-height: 1.8;
  padding: 0 10rpx;
  white-space: pre-wrap;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  width: 100%;
}

.loading-text, .error-text {
  font-size: 30rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.back-btn-large {
  background-color: #ff6b9d;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  border: none;
}
</style>