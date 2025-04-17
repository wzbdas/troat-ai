<template>
  <view class="phone-container">
    <view class="phone-content">
      <view class="title">绑定手机</view>
      
      <view class="input-group">
        <input 
          class="phone-input" 
          type="number" 
          maxlength="11" 
          placeholder="请输入11位手机号"
          v-model="phoneNumber"
        />
      </view>
      
      <view class="verify-group">
        <input 
          class="verify-input" 
          type="number" 
          maxlength="6" 
          placeholder="请输入短信验证码"
          v-model="verifyCode"
        />
        <button 
          class="verify-btn" 
          :disabled="!canSendCode || counting" 
          @tap="sendVerifyCode"
        >
          {{ counting ? `${countdown}s后重试` : '获取验证码' }}
        </button>
      </view>
      
      <button class="submit-btn" :disabled="!canSubmit" @tap="handleSubmit">
        绑定
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const phoneNumber = ref('');
const verifyCode = ref('');
const counting = ref(false);
const countdown = ref(60);

const canSendCode = computed(() => {
  return /^1[3-9]\d{9}$/.test(phoneNumber.value);
});

const canSubmit = computed(() => {
  return canSendCode.value && verifyCode.value.length === 6;
});

const sendVerifyCode = () => {
  if (!canSendCode.value || counting.value) return;
  
  counting.value = true;
  countdown.value = 60;
  
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      counting.value = false;
    }
  }, 1000);
  
  // 这里添加发送验证码的接口调用
  uni.showToast({
    title: '验证码已发送',
    icon: 'success'
  });
};

const handleSubmit = () => {
  if (!canSubmit.value) return;
  
  // 这里添加绑定手机号的接口调用
  uni.showToast({
    title: '绑定成功',
    icon: 'success',
    success: () => {
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  });
};
</script>

<style>
.phone-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 40rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 60rpx;
  color: #333;
}

.input-group {
  margin-bottom: 30rpx;
}

.phone-input {
  height: 90rpx;
  border-bottom: 1px solid #eee;
  font-size: 32rpx;
  padding: 0 20rpx;
}

.verify-group {
  display: flex;
  align-items: center;
  margin-bottom: 60rpx;
  border-bottom: 1px solid #eee;
}

.verify-input {
  flex: 1;
  height: 90rpx;
  font-size: 32rpx;
  padding: 0 20rpx;
}

.verify-btn {
  width: 200rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 28rpx;
  color: #fff;
  background-color: #ff6b9d;
  border-radius: 35rpx;
  padding: 0;
  margin: 0;
}

.verify-btn[disabled] {
  background-color: #ffc1d7;
}

.submit-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: #ff6b9d;
  border-radius: 45rpx;
  margin-top: 60rpx;
}

.submit-btn[disabled] {
  background-color: #ffc1d7;
}
</style>