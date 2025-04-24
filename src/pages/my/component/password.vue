<template>
  <view class="password-container">
    <view class="password-form">
      <view class="input-box">
        <input 
          class="password-input" 
          type="password" 
          placeholder="请输入密码(长度8-20英文和数字)" 
          v-model="password"
          maxlength="20"
        />
      </view>
      
      <view class="input-box">
        <input 
          class="password-input" 
          type="password" 
          placeholder="请确认密码(长度8-20英文和数字)" 
          v-model="confirmPassword"
          maxlength="20"
        />
      </view>
      
      <button 
        class="confirm-btn" 
        :disabled="!isValid" 
        :class="{ 'btn-active': isValid }"
        @tap="handleSetPassword"
      >
        确认
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref('');
const confirmPassword = ref('');

const isValid = computed(() => {
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
  return passwordRegex.test(password.value) && 
         password.value === confirmPassword.value;
});

const handleSetPassword = () => {
  if (!isValid.value) return;
  
  uni.showLoading({ title: '设置中...' });
  
  setTimeout(() => {
    uni.hideLoading();
    // 使用事件总线发送密码
    uni.$emit('passwordSet', password.value);
    
    uni.showToast({
      title: '密码设置成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    });
  }, 1500);
};
</script>

<style>
.password-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 40rpx;
}

.password-form {
  padding: 0 30rpx;
}

.input-box {
  border-bottom: 1px solid #eee;
  margin-bottom: 40rpx;
  padding: 20rpx 0;
}

.password-input {
  font-size: 28rpx;
  color: #333;
  width: 100%;
}

.confirm-btn {
  margin-top: 80rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  background: linear-gradient(to right, #eb9d9d, #ff6b9d);
  color: white;
  font-size: 32rpx;
  border: none;
  color: #fff;
}



.btn-active {
  opacity: 1;
}

/* 修改placeholder的颜色 */
.password-input::placeholder {
  color: #999;
}
</style>