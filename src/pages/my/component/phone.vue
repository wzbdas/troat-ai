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
const serverCode = ref(''); // 存储服务器返回的验证码

const canSendCode = computed(() => {
  return /^1[3-9]\d{9}$/.test(phoneNumber.value);
});

const canSubmit = computed(() => {
  return canSendCode.value && verifyCode.value.length === 6;
});

// 修改发送验证码方法
const sendVerifyCode = async () => {
  if (!canSendCode.value || counting.value) return;
  
  try {
    const result = await uni.request({
      url: `http://localhost:3000/users/verifyCode?phone=${phoneNumber.value}`,
      method: 'GET'
    });

    if (result.statusCode === 200) {
      // 保存服务器返回的验证码
      serverCode.value = JSON.parse(result.data);
      
      // 开始倒计时
      counting.value = true;
      countdown.value = 60;
      
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          counting.value = false;
        }
      }, 1000);

      uni.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
    } else {
      throw new Error(result.data?.message || '发送失败');
    }
  } catch (error) {
    console.error('发送验证码失败:', error);
    uni.showToast({
      title: '发送失败',
      icon: 'error'
    });
  }
};

// 修改提交方法
const handleSubmit = () => {
  if (!canSubmit.value) return;
  
  try {
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      parsedInfo.phone = phoneNumber.value;
      uni.setStorageSync('userInfo', JSON.stringify(parsedInfo));
      uni.setStorageSync('userPhone', phoneNumber.value);
      
      uni.showToast({
        title: '绑定成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            // 触发事件，传递手机号
            uni.$emit('phoneBindSuccess', phoneNumber.value);
            // 修改为重定向到设置页面
            uni.redirectTo({
              url: '/pages/my/component/setting'
            });
          }, 1500);
        }
      });
    }
  } catch (error) {
    console.error('绑定失败:', error);
    uni.showToast({
      title: '绑定失败',
      icon: 'error'
    });
  }
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