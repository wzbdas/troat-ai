<template>
  <div class="login-container">
    <!-- #ifdef H5 -->
    <div class="h5-login">
      <div class="title">欢迎来到塔塔图灵</div>
      
      <!-- 手机号输入 -->
      <div class="input-group">
        <input 
          type="number" 
          class="phone-input" 
          placeholder="请输入11位手机号"
          v-model="phone"
          maxlength="11"
        >
      </div>

      <!-- 验证码输入 -->
      <div class="input-group code-group">
        <input 
          type="number" 
          class="code-input" 
          placeholder="请输入短信验证码"
          v-model="code"
        >
        <button 
          class="code-btn" 
          :disabled="isCountingDown"
          @click="getCode"
        >
          {{ countDownText }}
        </button>
      </div>

      <!-- 登录方式切换 -->
      <div class="login-type">
        <div class="type-text">手机登录（仅中国大陆）</div>
        <div class="switch-btn" @click="switchLoginType">切换</div>
      </div>

      <!-- 登录问题说明 -->
      <div class="help-section">
        <div class="help-text" @click="showLoginHelp">
          登录问题说明
          <text class="help-icon">?</text>
        </div>
        <div class="login-method" @click="showDifferentLogin">
          不同登录方式账号不同
          <text class="help-icon">?</text>
        </div>
      </div>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">登录</button>

      <!-- 协议勾选 -->
      <div class="agreement-checkbox">
        <checkbox 
          :checked="agreeTerms" 
          @click="agreeTerms = !agreeTerms"
        ></checkbox>
        <text class="agreement-text">
          首次登录会自动创建账号，且代表同意
          <text class="link">《用户服务协议》</text>
          及
          <text class="link">《隐私政策》</text>
        </text>
      </div>

      <!-- 返回首页 -->
      <div class="back-home" @click="goBack">返回首页</div>
    </div>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <div class="logo-area">
      <img src="../../img/8.png" alt="塔塔图灵" class="logo-img">
      <div class="logo-text">塔塔图灵</div>
      <div class="logo-slogan">— 爱情 · 财富 · 事业 · 健康 —</div>
    </div>

    <!-- 登录按钮区域 -->
    <div class="login-btn-area">
      <button class="phone-login-btn" @click="phoneLogin">
        <text class="btn-icon">&#xe600;</text>
        手机号快捷登录
      </button>
    </div>
    
    <!-- 其他登录方式 -->
    <div class="other-login">
      <div class="divider">
        <div class="line"></div>
        <div class="text">其他登录方式</div>
        <div class="line"></div>
      </div>
      
      <div class="sim-login-btn" @click="simLogin">
        <div class="sim-icon">
          <text class="icon-phone">&#xe601;</text>
        </div>
        <div class="sim-text">模拟快捷登录</div>
      </div>
    </div>

    <!-- 底部协议 -->
    <div class="agreement">
      <text>登录/注册即视为你同意</text>
      <text class="link">《服务条款》</text>
      <text>和</text>
      <text class="link">《塔塔图灵隐私协议》</text>
    </div>
    <!-- #endif -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// 修改导入路径
import { useMemberStore } from '@/stores/modules/member'

// H5 端表单数据
const phone = ref('');
const code = ref('');
const inviteCode = ref('');
const agreeTerms = ref(false);
const countdown = ref(60);
const isCountingDown = ref(false);
const countDownText = ref('获取验证码');

// H5 端方法
const getCode = () => {
  if (!phone.value || phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    });
    return;
  }
  
  isCountingDown.value = true;
  countDownText.value = `${countdown.value}s`;
  
  const timer = setInterval(() => {
    countdown.value--;
    countDownText.value = `${countdown.value}s`;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isCountingDown.value = false;
      countdown.value = 60;
      countDownText.value = '获取验证码';
    }
  }, 1000);
};

const handleLogin = () => {
  if (!phone.value || phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    });
    return;
  }
  
  if (!code.value) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    });
    return;
  }
  
  if (!agreeTerms.value) {
    uni.showToast({
      title: '请同意服务协议和隐私政策',
      icon: 'none'
    });
    return;
  }
  // 这里添加登录逻辑

};

const switchLoginType = () => {
  uni.showToast({
    title: '切换登录方式',
    icon: 'none'
  });
};

const showLoginHelp = () => {
  uni.showToast({
    title: '登录问题说明',
    icon: 'none'
  });
};

const showDifferentLogin = () => {
  uni.showToast({
    title: '不同登录方式说明',
    icon: 'none'
  });
};

// 小程序端方法
const memberStore = useMemberStore()

const phoneLogin = () => {
  // 设置token到pinia
  memberStore.setToken('test-token-123')

  // 跳转到my页面
  uni.switchTab({
    url: '/pages/my/my',
    success: () => {
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
    }
  })
}

const simLogin = () => {
  // 设置token到pinia
  memberStore.setToken('test-token-123')
  
  // 使用reLaunch跳转到我的页面
  uni.reLaunch({
    url: '/pages/my/my',
    success: () => {
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
    }
  })
}

const goBack = () => {
  uni.navigateBack();
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
}


.logo-area {
  padding-top: 15vh;
  text-align: center;
}

.logo-img {
  width: 29vw;
  height: 20vw;
  margin-bottom: 2vh;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1vh;
}

.logo-slogan {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15vh;
}


.phone-login-btn {
  width: 85vw;
  height: 11vw;
  background: #FF69B4;
  color: white;
  border: none;
  border-radius: 5.5vw;
  font-size: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon {
  margin-right: 2vw;
}


.other-login {
  margin-top: 8vh;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4vh 7.5vw;
}

.line {
  flex: 1;
  height: 1px;
  background: #eee;
}

.text {
  padding: 0 3vw;
  color: #999;
  font-size: 0.9rem;
}

.sim-login-btn {
  width: 85vw;
  margin: 0 auto;
  height: 11vw;
  border: 1px solid #eee;
  border-radius: 5.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sim-icon {
  margin-right: 2vw;
}


.agreement {
  position: fixed;
  bottom: 5vh;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.8rem;
  color: #999;
}

.link {
  color: #FF69B4;
}
.h5-login {
  width: 100%;
  padding: 8vh 7.5vw;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10vh;
  text-align: center;
}

.input-group {
  margin-bottom: 4vh;
  position: relative;
}

.phone-input,
.code-input {
  width: 100%;
  height: 12vw;
  border: none;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
  padding: 0 2vw;
  background: transparent;
}

.code-group {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.code-input {
  flex: 1;
}

.code-btn {
  width: 30vw;
  height: 10vw;
  background: #FF69B4;
  color: white;
  border: none;
  border-radius: 5vw;
  font-size: 0.9rem;
}

.code-btn:disabled {
  background: #ccc;
}

.login-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4vh 0;
}

.type-text {
  color: #FF69B4;
  font-size: 0.9rem;
}

.switch-btn {
  color: #666;
  font-size: 0.9rem;
}

.help-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6vh;
}

.help-text,
.login-method {
  color: #666;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

.help-icon {
  margin-left: 1vw;
  width: 4vw;
  height: 4vw;
  border: 1px solid #666;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.login-btn {
  width: 100%;
  height: 12vw;
  background: linear-gradient(to right, #FF69B4, #FF1493);
  color: white;
  border: none;
  border-radius: 6vw;
  font-size: 1rem;
  margin: 6vh 0;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  margin-top: 4vh;
}

.agreement-text {
  font-size: 0.8rem;
  color: #666;
  margin-left: 2vw;
  line-height: 1.4;
}

.back-home {
  text-align: center;
  color: #FF69B4;
  font-size: 1rem;
  margin-top: 6vh;
}

.link {
  color: #FF69B4;
}
</style>


