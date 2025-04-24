<template>
  <view class="register-container">
    <div class="title">欢迎来到塔塔图灵</div>
    <view class="register-form">
      <!-- 手机号输入 -->
      <view class="input-box">
        <input 
          type="number" 
          class="register-input" 
          placeholder="请输入账号" 
          v-model="phone"
          maxlength="11"
        />
      </view>


      <!-- 密码输入 -->
      <view class="input-box">
        <input 
          type="password" 
          class="register-input" 
          placeholder="请设置密码(8-20位英文和数字)" 
          v-model="password"
          maxlength="20"
        />
      </view>
      
    

      <!-- 协议勾选 -->
      <view class="agreement">
        <checkbox 
          :checked="agreeTerms" 
          @tap="agreeTerms = !agreeTerms"
        ></checkbox>
        <text class="agreement-text">
          注册即代表同意
          <text class="link" @tap="goToUserAgreement">《用户服务协议》</text>
          及
          <text class="link" @tap="goToPrivacyPolicy">《隐私政策》</text>
        </text>
      </view>

      <!-- 注册按钮 -->
      <button 
        class="register-btn" 
        :disabled="!isValid"
        :class="{ 'btn-active': isValid }"
        @tap="handleRegister"
      >
        注册
      </button>

      <!-- 返回登录 -->
      <view class="back-login" @tap="goToLogin">返回登录</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const phone = ref('');
const password = ref('');
const agreeTerms = ref(false);

const isValid = computed(() => {
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
  return phone.value.length > 0 &&
         passwordRegex.test(password.value) &&
         agreeTerms.value;
});
// 跳转到用户服务协议
const goToUserAgreement = () => {
  uni.navigateTo({
    url: '/pages/my/component/user'
  });
};

// 跳转到隐私政策
const goToPrivacyPolicy = () => {
  uni.navigateTo({
    url: '/pages/my/component/Policy'
  });
};

// 处理注册
const handleRegister = async () => {
  if (!isValid.value) return;
  
  if (!phone.value || !password.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    });
    return;
  }
  
  uni.showLoading({ title: '注册中...' });
  
  try {
    const { data } = await uni.request({
      url: 'http://localhost:3000/users/add',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        name: phone.value,  // 添加用户名字段
        phone: phone.value,
        password: password.value,
        img:"../../static/img/1.jpg",
        sunsign:"白羊座",
        moonsign:"金牛座",
        risesign:"狮子座",
        sex:"女",
        surplus: 100,
      }
    });

    console.log('注册响应:', data);

    if (data.code === 200) {  // 修改状态码判断
      uni.hideLoading();
      uni.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            goToLogin();
          }, 2000);
        }
      });
    } else {
      throw new Error(data.msg || '注册失败');
    }
  } catch (error) {
    console.error('注册错误:', error);
    uni.hideLoading();
    uni.showToast({
      title: error.message || '注册失败，请稍后重试',
      icon: 'error'
    });
  }
};

// 返回登录页
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  });
};
</script>

<style>
.register-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 40rpx;
}

.register-form {
  padding: 0 30rpx;
}

.input-box {
  border-bottom: 1px solid #eee;
  margin-bottom: 40rpx;
  padding: 20rpx 0;
}

.register-input {
  font-size: 28rpx;
  color: #333;
  width: 100%;
}

.code-box {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 40rpx;
  padding: 20rpx 0;
}

.code-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}
.title {
    margin-top: 5vh;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5vh;
  text-align: center;
}
.code-btn {
  width: 200rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 24rpx;
  color: #ff6b9d;
  background: none;
  border: 1px solid #ff6b9d;
  border-radius: 30rpx;
}

.code-btn[disabled] {
  color: #999;
  border-color: #999;
}

.agreement {
  display: flex;
  align-items: center;
  margin: 40rpx 0;
}

.agreement-text {
  font-size: 24rpx;
  color: #666;
  margin-left: 10rpx;
}

.link {
  color: #ff6b9d;
}

.register-btn {
  margin-top: 60rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  background: linear-gradient(to right, #eb9d9d, #ff6b9d);
  color: white;
  font-size: 32rpx;
  border: none;
  opacity: 0.7;
}

.btn-active {
  opacity: 1;
}

.back-login {
  text-align: center;
  margin-top: 40rpx;
  font-size: 28rpx;
  color: #666;
}

/* 修改placeholder的颜色 */
.register-input::placeholder {
  color: #999;
}
</style>