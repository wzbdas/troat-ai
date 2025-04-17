<template>
  <view class="setting-container">
    <view class="setting-group">
      <view class="setting-item">
        <text class="setting-label">专业设置</text>
        <text class="setting-arrow">›</text>
      </view>
      
      
      <view class="setting-item">
        <text class="setting-label">重置小程序</text>
        <text class="setting-arrow">›</text>
      </view>
      
      <view class="setting-item">
        <view class="setting-label-with-icon">
          <text>读取生日口令</text>
          <text class="info-icon">?</text>
        </view>
        <view class="setting-value">
          <text>已关闭</text>
          <text class="setting-arrow">›</text>
        </view>
      </view>
      
      <view class="setting-item">
        <text class="setting-label">重置星盘设置</text>
        <text class="setting-arrow">›</text>
      </view>
    </view>
    
    <view class="setting-group">
      <view class="setting-item" @tap="goToPhone">
        <text class="setting-label">绑定手机号</text>
        <view class="setting-value">

          <text class="setting-arrow">›</text>
        </view>
      </view>
      

      
      <view class="setting-item" @tap="goToPassword" >
        <text class="setting-label">设置登录密码</text>
        <view class="setting-value">
          <text class="password-text" v-if="password">已设置</text>
          <text class="password-text" v-else>未设置</text>
          <text class="setting-arrow">›</text>
        </view>
      </view>
      
      <view class="setting-item">
        <text class="setting-label">注销账号</text>
        <view class="setting-value">
          <text class="delete-account">注销风险说明</text>
          <text class="setting-arrow">›</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const password = ref('');

const goToPhone = () => {
  uni.navigateTo({
    url: '/pages/my/component/phone'
  });
};

// 添加删除密码的方法
// const handleDeletePassword = () => {
//   if (!password.value) return;
  
//   uni.showModal({
//     title: '提示',
//     content: '确定要删除登录密码吗？',
//     success: (res) => {
//       if (res.confirm) {
//         password.value = '';
//         uni.showToast({
//           title: '密码已删除',
//           icon: 'success'
//         });
//       }
//     }
//   });
// };

// 监听密码设置事件
const handlePasswordSet = (newPassword: string) => {
  password.value = newPassword;
};

onMounted(() => {
  // 添加事件监听
  uni.$on('passwordSet', handlePasswordSet);
});

onUnmounted(() => {
  // 移除事件监听
  uni.$off('passwordSet', handlePasswordSet);
});

const goToPassword = () => {
  uni.navigateTo({
    url: '/pages/my/component/password'
  });
};
</script>

<style>
.setting-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20rpx 0;
}

.setting-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 20rpx 30rpx;
  overflow: hidden;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1px solid #f0f2f5;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  font-size: 32rpx;
  color: #333;
}

.setting-label-with-icon {
  display: flex;
  align-items: center;
}

.info-icon {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #999;
  margin-left: 10rpx;
}

.setting-value {
  display: flex;
  align-items: center;
}

.setting-arrow {
  font-size: 36rpx;
  color: #999;
  margin-left: 10rpx;
}

.phone-number, .email {
  font-size: 28rpx;
  color: #666;
}

.delete-account {
  font-size: 28rpx;
  color: #666;
}

.password-text {
  font-size: 28rpx;
  color: #666;
  margin-right: 10rpx;
}
</style>