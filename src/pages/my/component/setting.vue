<template>
  <view class="setting-container">
    <view class="setting-group">
      <view class="setting-item" @tap="goToIndividuation">
        <text class="setting-label" >个性化设置</text>
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
          <text class="phone-number" v-if="phoneNumber">{{ formatPhoneNumber(phoneNumber) }}</text>
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
      
      <view class="setting-item" @tap="handleDeleteAccount">
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
import useTheme from '@/mixins/themeMixin'
import { onShow } from '@dcloudio/uni-app';
// 使用主题混入
const { currentTheme, isDarkMode, darkModeColor } = useTheme()

const password = ref('');
const phoneNumber = ref('');
// 添加手机号格式化函数
const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};
// 添加跳转到个性化设置页面的方法
const goToIndividuation = () => {
  uni.navigateTo({
    url: '/pages/my/component/individuation'
  });
};
// 获取手机号
const getPhoneNumber = () => {
  const phone = uni.getStorageSync('userPhone');
  if (phone) {
    phoneNumber.value = phone;
  }
};



const setNavBarColor = () => {
  const themeColor = isDarkMode.value ? darkModeColor : currentTheme.value;
  try {
    uni.setNavigationBarColor({
      frontColor: isDarkMode.value ? '#ffffff' : '#000000',
      backgroundColor: themeColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
  } catch (error) {
    console.error('设置导航栏颜色失败:', error);
  }
};

onShow(() => {
  // 每次页面显示时重新应用主题
  const savedTheme = uni.getStorageSync('theme_color') || '#FF69B4'
  const savedDarkMode = uni.getStorageSync('dark_mode') === 'true'
  
  // 如果存储的主题与当前主题不同，则更新
  if (savedTheme !== currentTheme.value || savedDarkMode !== isDarkMode.value) {
    currentTheme.value = savedTheme
    isDarkMode.value = savedDarkMode
    
    // 设置导航栏颜色
    setNavBarColor();
    
    // 强制更新当前页面
    setTimeout(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.$vm) {
        currentPage.$vm.$forceUpdate();
      }
    }, 50);
  } else {
    // 即使主题没变，也要确保导航栏颜色正确
    setNavBarColor();
  }
});




    
onMounted(() => {
  // 添加事件监听
  uni.$on('passwordSet', handlePasswordSet);
  // 获取手机号
  getPhoneNumber();
  // 监听手机号绑定成功事件
  uni.$on('phoneBindSuccess', (phone: string) => {
    phoneNumber.value = phone;
  });
  uni.$on('themeChanged', (data: {color: string, isDark: boolean}) => {
    // 更新当前页面的主题状态
    currentTheme.value = data.color;
    isDarkMode.value = data.isDark;
    
    // 设置导航栏颜色
    setNavBarColor();
    
    // 强制更新当前页面
    setTimeout(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.$vm) {
        currentPage.$vm.$forceUpdate();
      }
    }, 50);
  });
  
  // 初始设置导航栏颜色
  setNavBarColor();
  });



onUnmounted(() => {
  // 移除事件监听
  uni.$off('passwordSet', handlePasswordSet);
  uni.$off('phoneBindSuccess');
});

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

// 添加删除账号的方法
const handleDeleteAccount = () => {
  if (!phoneNumber.value) {
    uni.showToast({
      title: '请先绑定手机号',
      icon: 'none'
    });
    return;
  }
  
  uni.showModal({
    title: '注销账号',
    content: '注销后，您的账号数据将被永久删除且无法恢复，确定要注销吗？',
    confirmColor: '#FF0000',
    success: (res) => {
      if (res.confirm) {
        deleteUserAccount();
      }
    }
  });
};

// 调用后端接口删除用户账号
const deleteUserAccount = () => {
  uni.showLoading({
    title: '处理中...'
  });
  
  uni.request({
    url: 'http://localhost:3000/users/delete', // 请替换为您的实际后端接口地址
    method: 'POST',
    data: {
      phone: phoneNumber.value
    },
    success: (res) => {
      if (res.data.code === 200) {
        // 删除成功，清除本地存储的用户信息
        uni.removeStorageSync('userPhone');
        uni.removeStorageSync('token');
        // 可能需要清除其他用户相关的存储
        
        uni.showToast({
          title: '账号已注销',
          icon: 'success'
        });
        
        // 延迟后跳转到登录页面
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login'
          });
        }, 1500);
      } else {
        uni.showToast({
          title: res.data.msg || '注销失败，请稍后再试',
          icon: 'none'
        });
      }
    },
    fail: (err) => {
      console.error('注销账号请求失败:', err);
      uni.showToast({
        title: '网络错误，请稍后再试',
        icon: 'none'
      });
    },
    complete: () => {
      uni.hideLoading();
    }
  });
};
</script>

<style>
.setting-container {
  min-height: 100vh;
  background-color: var(--bg-color, #f0f2f5);
  padding: 20rpx 0;
  transition: background-color 0.3s ease;
}

.setting-group {
  background-color: var(--card-bg-color, #fff);
  border-radius: 16rpx;
  margin: 20rpx 30rpx;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1px solid var(--border-color, #f0f2f5);
  transition: border-color 0.3s ease;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  font-size: 32rpx;
  color: var(--text-color, #333);
  transition: color 0.3s ease;
}

.setting-label-with-icon {
  display: flex;
  align-items: center;
}

.info-icon {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 1px solid var(--icon-color, #999);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: var(--icon-color, #999);
  margin-left: 10rpx;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.setting-value {
  display: flex;
  align-items: center;
}

.setting-arrow {
  font-size: 36rpx;
  color: var(--icon-color, #999);
  margin-left: 10rpx;
  transition: color 0.3s ease;
}

.phone-number, .email {
  font-size: 28rpx;
  color: var(--secondary-text-color, #666);
  transition: color 0.3s ease;
}

.delete-account {
  font-size: 28rpx;
  color: var(--secondary-text-color, #666);
  transition: color 0.3s ease;
}

.password-text {
  font-size: 28rpx;
  color: var(--secondary-text-color, #666);
  margin-right: 10rpx;
  transition: color 0.3s ease;
}

/* 删除这些未使用的类 */
/* .your-container, .your-card, .your-text, .your-secondary-text, .your-icon, .your-highlight {
  ...
} */
</style>