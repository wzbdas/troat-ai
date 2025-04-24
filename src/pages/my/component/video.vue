<template>
  <view class="video-container">
    <view class="video-header">
      <view class="back-btn" @tap="goBack">返回</view>
      <view class="title">观看广告</view>
      <view class="placeholder"></view>
    </view>
    
    <view class="video-wrapper">
      <video 
        id="adVideo" 
        class="video-player" 
        :src="videoSrc" 
        controls 
        autoplay 
        @ended="handleVideoEnd"
      ></video>
    </view>
    
    <view class="info-text">
      <text>观看完整广告可获得50星币奖励</text>
      <text>剩余时间: {{ remainingTime }}秒</text>
    </view>
    
    <view class="btn-container">
      <button 
        class="reward-btn" 
        :disabled="!videoCompleted" 
        :class="{ 'btn-active': videoCompleted }"
        @tap="claimReward"
      >
        {{ videoCompleted ? '领取奖励' : '请观看完整广告' }}
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 视频源
const videoSrc = ref('https://media.w3.org/2010/05/sintel/trailer.mp4'); // 示例视频，实际使用时替换
const videoCompleted = ref(false);
const remainingTime = ref(52); 
let timer: any = null;

// 返回上一页
// 修改返回方法
const goBack = () => {
  try {
    uni.navigateBack();
  } catch (e) {
    uni.redirectTo({
      url: '/pages/my/my'
    });
  }
};

// 视频结束处理
const handleVideoEnd = () => {
  videoCompleted.value = true;
  clearInterval(timer);
  remainingTime.value = 0;
};

// 修改领取奖励方法
const claimReward = () => {
  if (videoCompleted.value) {
    uni.showLoading({
      title: '领取中...'
    });
    
    // 发送事件通知父页面更新数据
    uni.$emit('videoReward');
    
    setTimeout(() => {
      uni.hideLoading();
      uni.showToast({
        title: '获得50星币',
        icon: 'success'
      });
      
      // 延迟返回，使用 switchTab 跳转到 tabBar 页面
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/my/my'
        });
      }, 1500);
    }, 1000);
  }
};

onMounted(() => {
  // 倒计时
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

onUnmounted(() => {
  // 清除定时器
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.video-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  padding-top: var(--status-bar-height); /* 添加这行 */
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 4vw;
  background-color: #fff;
  position: relative; /* 添加这行 */
  z-index: 100;     /* 添加这行 */
}

.back-btn {
  font-size: 16px;
  color: #333;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.placeholder {
  width: 40px;
}

.video-wrapper {
  width: 100%;
  height: 40vh;
  background-color: #000;
}

.video-player {
  width: 100%;
  height: 100%;
}

.info-text {
  padding: 4vh 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.info-text text {
  font-size: 14px;
  color: #666;
}

.btn-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4vw;
}

.reward-btn {
  width: 80%;
  height: 44px;
  border-radius: 22px;
  background-color: #ccc;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-active {
  background-color: #ff6b9d;
}
</style>