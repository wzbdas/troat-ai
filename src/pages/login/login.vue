<template>
  <div class="login-container">
    <!-- #ifdef H5 -->
    <div class="h5-login">
      <div class="title">欢迎来到塔塔图灵</div>
      
      <!-- 账号密码登录 -->
      <template v-if="!isPhoneLogin">
        <div class="input-group">
          <input 
            type="text" 
            class="account-input" 
            placeholder="请输入账号"
            v-model="account"
            maxlength="20"
          >
        </div>
        <div class="input-group">
          <input 
            type="password" 
            class="password-input" 
            placeholder="请输入密码"
            v-model="password"
            maxlength="20"
          >
        </div>
      </template>

      <!-- 手机验证码登录 -->
      <template v-else>
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
      </template>

      <!-- 登录方式切换 -->
      <div class="login-type">
        <div class="type-text">{{ isPhoneLogin ? '手机登录（仅中国大陆）' : '账号密码登录' }}</div>
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

      <!-- 注册链接 -->
      <div class="register-link" @click="goToRegister">
        没有账号？<text class="link">去注册</text>
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
      <!-- <div class="back-home" @click="goBack">返回首页</div> -->
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
// 添加验证码存储
const serverCode = ref(''); // 存储服务器返回的验证码

// 修改获取验证码方法
const getCode = () => {
  if (!phone.value || phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    });
    return;
  }
  
  // 调用验证码接口
  uni.request({
    url: `http://localhost:3000/users/verifyCode?phone=${phone.value}`,  // 修改为查询字符串方式
    method: 'GET',
    // 修改获取验证码方法的 success 回调
    success: (res) => {
      if (res.statusCode === 200) {
        // 解析验证码
        try {
          const code = JSON.parse(res.data);
          serverCode.value = code;
          
          // 开始倒计时
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
    
          uni.showToast({
            title: '验证码已发送',
            icon: 'success'
          });
        } catch (error) {
          uni.showToast({
            title: '验证码解析失败',
            icon: 'error'
          });
        }
      } else {
        uni.showToast({
          title: res.data?.message || '验证码发送失败',
          icon: 'error'
        });
      }
    },
    fail: (err) => {
      console.error('请求失败：', err);
      uni.showToast({
        title: '网络请求失败',
        icon: 'error'
      });
    }
  });
};

// 添加手机号验证函数
const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// 修改登录方法
const handleLogin = async () => {
  if (isPhoneLogin.value) {
    // 手机验证码登录验证
    if (!phone.value || !validatePhoneNumber(phone.value)) {
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
  } else {
    // 账号密码登录验证
    if (!account.value) {
      uni.showToast({
        title: '请输入账号',
        icon: 'none'
      });
      return;
    }
    if (!password.value) {
      uni.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
  }

  if (!agreeTerms.value) {
    uni.showToast({
      title: '请同意服务协议和隐私政策',
      icon: 'none'
    });
    return;
  }

  // 显示加载提示
  uni.showLoading({
    title: '登录中...'
  });

  try {
    const { data } = await uni.request({
      url: 'http://localhost:3000/users/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: isPhoneLogin.value ? {
        // 验证码登录参数
        phone: phone.value,
        yzCode: code.value,
        isCode: 0
      } : {
        // 密码登录参数
        phone: account.value,
        password: password.value,
        isCode: 1
      }
    });

    uni.hideLoading();

    if (data.code === 200) {
      // 登录成功处理
      memberStore.setToken('test-token-123');
      uni.setStorageSync('userInfo', JSON.stringify(data.data));
      // 根据登录方式存储不同的手机号
      uni.setStorageSync('userPhone', isPhoneLogin.value ? phone.value : account.value);
      
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/my/my'
        });
      }, 1500);
    } else {
      uni.showToast({
        title: data.msg || '登录失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('登录失败:', error);
    uni.hideLoading();
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
  }
};

// 添加账号密码登录相关变量
const isPhoneLogin = ref(true); // 默认为手机登录
const account = ref('');
const password = ref('');
const isCode=ref(0)

// 修改切换登录方式的方法
const switchLoginType = () => {
  isPhoneLogin.value = !isPhoneLogin.value;
  if(isCode.value==0){
    isCode.value=1
  }else if(isCode.value==1){
      isCode.value=0
  }
  console.log(isCode.value);
  
  // 清空输入
  if (isPhoneLogin.value) {
    account.value = '';
    password.value = '';
  } else {
    phone.value = '';
    code.value = '';
  }
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

const simLogin = async () => {
  try {
    // 使用固定的手机号模拟登录
    const { data } = await uni.request({
      url: 'http://localhost:3000/users/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        phone: '15831006073',
        password: 'cuiai123' 
      }
    });

    if (data.code === 200) {
      // 设置token到pinia
      memberStore.setToken('test-token-123');
      // 存储用户信息
      uni.setStorageSync('userInfo', JSON.stringify(data.data));
      // 存储登录手机号
      uni.setStorageSync('userPhone', '15831006073');
      
      // 使用reLaunch跳转到我的页面
      uni.reLaunch({
        url: '/pages/my/my',
        success: () => {
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
        }
      });
    } else {
      uni.showToast({
        title: data.msg || '登录失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('登录失败:', error);
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
  }
}

const goBack = () => {
  uni.navigateBack();
}

// 添加跳转到注册页面的方法
const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/my/component/register'
  });
};
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
.register-link {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2vh;
  padding: 10px;
  cursor: pointer;
}

.register-link .link {
  color: #FF69B4;
  font-weight: 500;
}

</style>




