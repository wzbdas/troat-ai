<template>
  <view class="my">
    <!-- 头部登录/注册区域 -->
    <view class="header" @tap="goToLogin" v-if="!hasToken">
      <view class="avatar"><image class="avatar-img" src="../../img/7.png" mode="aspectFill"></image></view>
      <view class="login-text">登录/注册</view>
    </view>
    <!-- 修改模板部分 -->
    <!-- 修改已登录的头部部分，添加点击事件 -->
    <view v-else class="header" @tap="goToProfile">
      <view class="avatar">
        <image class="avatar-img" src="../../img/1.jpg" mode="aspectFill"></image>
      </view>
      <view class="user-info">
    <text class="nickname">{{ userList[0]?.name || '未设置昵称' }}</text><br>
    <text class="constellation">日{{ formatSign(userList[0]?.sunsign) }}·月{{ formatSign(userList[0]?.moonsign) }}·升{{ formatSign(userList[0]?.risesign) }}</text>
  </view>
    </view>

    <!-- 星币卡片部分 -->
    <view class="star-card" v-if="hasToken">
      <view class="star-header">
        <view class="star-amount">
          <text class="amount">{{ userList[0]?.surplus || 0 }}</text>
          <text class="label">我的星币</text>
          <text class="info-icon" @tap="showStarInfo">?</text>
        </view>
        <button class="recharge-btn" @tap="handleRecharge">星币充值</button>
      </view>

      <view class="task-list">
        <view class="task-item">
          <view class="task-left">
            <view class="task-icon sign">签</view>
            <view class="task-info">
              <text class="task-name">签到</text>
              <text class="task-reward">奖励50星币</text>
            </view>
          </view>
          <text 
            class="task-status" 
            :class="isSignedIn ? 'completed' : 'todo'"
            @tap="handleSignIn"
            v-if="!isSignedIn"
          >
            去完成
          </text>
          <text 
            class="task-status completed" 
            v-else
          >
            已完成
          </text>
        </view>

        <view class="task-item">
          <view class="task-left">
            <view class="task-icon share">分</view>
            <view class="task-info">
              <text class="task-name">分享</text>
              <text class="task-reward">奖励50星币</text>
            </view>
          </view>
          <text class="task-status" :class="isShared ? 'completed' : 'todo'" @tap="handleShare">
            {{ isShared ? '已完成' : '去完成' }}
          </text>
        </view>

        <view class="task-item">
        
          <view class="task-item">
            <view class="task-left">
              <view class="task-icon video">视</view>
              <view class="task-info">
                <text class="task-name">视频广告</text>
                <text class="task-reward">奖励50星币 | 今日剩余{{ videoRemaining }}次</text>
              </view>
            </view>
            <text 
              class="tasks" 
              :class="videoRemaining <= 0 ? 'completed' : 'todo'" 
              @tap="watchVideo"
              v-if="videoRemaining > 0"
            >
              去完成
            </text>
            <text 
              class="task-status completed" 
              v-else
            >
              已完成
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 用户功能列表 -->
    <view class="menu-group">
      <view class="menu-item" 
        v-for="(item, index) in menuList1" 
        :key="index" 
        @tap="handleMenuClick(item)"
      >
        <view class="icon-placeholder" :style="{color: item.color}">{{ item.iconText }}</view>
        <text class="menu-text">{{ item.text }}</text>
        <view class="arrow-placeholder">›</view>
      </view>
    </view>

    <!-- 记录相关功能 -->
    <!-- <view class="menu-group">
      <view class="menu-item" v-for="(item, index) in menuList2" :key="index">
        <view class="icon-placeholder" :style="{color: item.color}">{{ item.iconText }}</view>
        <text class="menu-text">{{ item.text }}</text>
        <view class="arrow-placeholder">›</view>
      </view>
    </view> -->

    <!-- 分享和其他功能 -->
    <view class="menu-group">
      <view class="menu-item" 
        v-for="(item, index) in menuList3" 
        :key="index"
        @tap="handleMenuClick(item)"
      >
        <view class="icon-placeholder" :style="{color: item.color}">{{ item.iconText }}</view>
        <text class="menu-text">{{ item.text }}</text>
        <view class="arrow-placeholder">›</view>
      </view>
    </view>
    
    <!-- 设置 -->
    <view class="menu-group">
      <view class="menu-item" @tap="goToSetting">
        <view class="icon-placeholder" style="color: #4cd4de;">设</view>
        <text class="menu-text">设置</text>
        <view class="arrow-placeholder">›</view>
      </view>
      <!-- 添加退出登录按钮 -->
      <view class="menu-item" v-if="hasToken" @tap="handleLogout">
        <view class="icon-placeholder" style="color: #ff6b6b;">退</view>
        <text class="menu-text">退出登录</text>
        <view class="arrow-placeholder">›</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/stores/modules/member'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import { UpdateList } from '@/servers/index';
// 添加分享相关的状态和方法
const isShared = ref(false);
  // 在 script setup 中添加
  const videoRemaining = ref(5); // 视频观看剩余次数
          
          // 在 onMounted 中添加事件监听
          // onMounted(() => {
          //   hasToken.value = !!memberStore.getToken()
          //   getUserInfo()
            
          //   // 添加视频奖励事件监听
          //   uni.$on('videoReward', () => {
          //     if (userList.value[0]) {
          //       const updatedUser = { ...userList.value[0] };
          //       updatedUser.surplus = (updatedUser.surplus || 0) + 50;
          //       userList.value = [updatedUser];
          //       videoRemaining.value--;
          //     }
          //   });
          // });
          
          // 修改视频广告任务的模板部分

// 添加格式化星座的函数
const formatSign = (sign: string | undefined) => {
  if (!sign) return '';
  return sign.replace('座', '');
}

const userList = ref([])
const getUserInfo = async () => {
  try {
    // 获取存储的用户信息
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      userList.value = [JSON.parse(userInfo)];
      return;
    }

    // 如果没有存储的用户信息，则通过手机号获取
    const phone = uni.getStorageSync('userPhone');
    if (!phone) {
      // console.error('未找到登录信息');
      return;
    }

    const result = await uni.request({
      url: 'http://localhost:3000/users/login',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        phone: phone
      }
    });
    
    if (result.statusCode === 200 && result.data.code === 200) {
      userList.value = [result.data.data];
      // 更新存储的用户信息
      uni.setStorageSync('userInfo', JSON.stringify(result.data.data));
    } else {
      console.error('获取用户信息失败：', result);
      // 登录失效，清除信息并跳转登录页
      memberStore.setToken('');
      hasToken.value = false;
      uni.removeStorageSync('userInfo');
      uni.removeStorageSync('userPhone');
      uni.navigateTo({
        url: '/pages/login/login'
      });
    }
  } catch (error) {
    console.error('获取数据异常：', error);
  }
}

// 获取store实例
const memberStore = useMemberStore()

// 检查是否有token
const hasToken = ref(false)

onMounted(() => {
  // 使用 getToken 方法获取 token
  hasToken.value = !!memberStore.getToken()
  getUserInfo()
})

onLoad(()=>{
  getUserInfo()
})

// 显示星币说明
const showStarInfo = () => {
  uni.showToast({
    title: '星币是平台通用货币',
    icon: 'none'
  });
};

// 处理充值
const handleRecharge = () => {
  uni.navigateTo({
    url: '/pages/recharge/recharge'
  })
};

// 观看视频
const watchVideo = () => {
  uni.navigateTo({
    url: '../my/component/video'
  });
};

// 添加跳转到登录页面的方法
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  });
};

// 添加跳转到设置页面的方法
const goToSetting = () => {
  uni.navigateTo({
    url: '/pages/my/component/setting'
  });
};

// 处理菜单点击
const handleMenuClick = (item: any) => {
  if (item.text === '档案管理') {
    uni.navigateTo({
      url: '/pages/index/IndexPage/LocalArchives'
    })
  } else if (item.text === '问题反馈') {
    uni.navigateTo({
      url: '/pages/my/component/question'
    })
  }  else if (item.text === '我的卡券') {
    uni.navigateTo({
      url: '/pages/my/component/coupon'
    })
  } else if (item.text === '我的订单') {
    uni.navigateTo({
      url: '/pages/my/component/order'
    })
  } else if (item.text === '关于我们') {
    uni.navigateTo({
      url: '/pages/my/component/about'
    })
  }
}

const menuList1 = ref<MenuItem[]>([
  { iconText: '档', text: '档案管理', color: '#ff6b6b' },
  { iconText: '券', text: '我的卡券', color: '#ffcc00' },
  { iconText: '单', text: '我的订单', color: '#ff9f9f' },
  { iconText: '活', text: '我的活动', color: '#ff9f7f' },
]);


const menuList3 = ref<MenuItem[]>([
  { iconText: 'AI', text: 'AI解读记录', color: '#5e9cff' },
  { iconText: '反', text: '问题反馈', color: '#ff9f7f' },
  { iconText: '关', text: '关于我们', color: '#5e9cff' },
]);

// 添加退出登录方法
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        memberStore.setToken('');  // 清除token
        hasToken.value = false;
        // 清除所有存储的用户信息
        uni.removeStorageSync('userInfo');
        uni.removeStorageSync('userPhone');
        userList.value = [];
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        });
      }
    }
  });
}


const goToProfile = () => {
  uni.navigateTo({
    url: '/pages/profile/index'
  });
};

const getFirstChar = (sign: string | undefined) => {
  if (!sign) return '';
  return sign.charAt(0);  // 只返回第一个字
}

// 添加签到状态
const isSignedIn = ref(false)

// 修改处理签到方法
const handleSignIn = async () => {
  try {
    if (userList.value[0]) {
      const updatedUser = { ...userList.value[0] };
      const newSurplus = (updatedUser.surplus || 0) + 50;
      
      // 调用更新接口
      const result = await uni.request({
        url: 'http://localhost:3000/users/update',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          name: updatedUser.name,
          sunsign: updatedUser.sunsign,
          moonsign: updatedUser.moonsign,
          risesign: updatedUser.risesign,
          sex: updatedUser.sex,
          isOnline: true,
          surplus: newSurplus  // 发送新的星币数量
        }
      });

      if (result.statusCode === 200 && result.data.code === 200) {
        // 更新本地数据
        updatedUser.surplus = newSurplus;
        userList.value = [updatedUser];
        isSignedIn.value = true;
        
        // 更新本地存储
        uni.setStorageSync('userInfo', JSON.stringify(updatedUser));
        
        uni.showToast({
          title: '签到成功 +50星币',
          icon: 'success'
        });
      } else {
        throw new Error(result.data.msg || '签到失败');
      }
    }
  } catch (error) {
    console.error('签到失败：', error);
    uni.showToast({
      title: error.message || '签到失败',
      icon: 'error'
    });
  }
}


// 修改分享处理方法
const handleShare = async () => {
  if (!isShared.value && userList.value[0]) {
    try {
      const updatedUser = { ...userList.value[0] };
      const newSurplus = (updatedUser.surplus || 0) + 50;
      
      const result = await uni.request({
        url: 'http://localhost:3000/users/update',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          name: updatedUser.name,
          sunsign: updatedUser.sunsign,
          moonsign: updatedUser.moonsign,
          risesign: updatedUser.risesign,
          sex: updatedUser.sex,
          surplus: newSurplus,
          isOnline: true
        }
      });

      if (result.statusCode === 200 && result.data.code === 200) {
        updatedUser.surplus = newSurplus;
        userList.value = [updatedUser];
        isShared.value = true;
        uni.setStorageSync('userInfo', JSON.stringify(updatedUser));
        
        uni.showToast({
          title: '分享成功 +50星币',
          icon: 'success'
        });
      }
    } catch (error) {
      console.error('分享失败：', error);
      uni.showToast({
        title: '分享失败',
        icon: 'error'
      });
    }
  }
};

// 修改分享处理方法
onShareAppMessage(() => {
  // 分享成功后自动触发奖励
  handleShare();
  
  return {
    title: '塔塔图灵',
    path: '/pages/index/index',
    imageUrl: '/static/share.png'
  }
})

// 修改视频广告事件监听
onMounted(() => {
  hasToken.value = !!memberStore.getToken();
  getUserInfo();
  
  // 添加用户信息更新事件监听
  uni.$on('userInfoUpdated', () => {
    getUserInfo(); // 重新获取用户信息
  });
  
  // 添加视频奖励事件监听
  uni.$on('videoReward', async () => {
    try {
      if (userList.value[0]) {
        const updatedUser = { ...userList.value[0] };
        const newSurplus = (updatedUser.surplus || 0) + 50;
        
        const result = await uni.request({
          url: 'http://localhost:3000/users/update',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            name: updatedUser.name,
            sunsign: updatedUser.sunsign,
            moonsign: updatedUser.moonsign,
            risesign: updatedUser.risesign,
            sex: updatedUser.sex,
            surplus:updatedUser.surplus,
            isOnline: true
          }
        });

        if (result.statusCode === 200 && result.data.code === 200) {
          // 更新本地数据
          updatedUser.surplus = newSurplus;
          userList.value = [updatedUser];
          videoRemaining.value--;
          
          uni.showToast({
            title: '观看成功 +50星币',
            icon: 'success'
          });
        } else {
          throw new Error(result.data.msg || '更新失败');
        }
      }
    } catch (error) {
      console.error('更新失败：', error);
      uni.showToast({
        title: error.message || '更新失败',
        icon: 'error'
      });
    }
  });
});


// 定义分享内容
onShareAppMessage(() => {
  return {
    title: '塔塔图灵',
    path: '/pages/index/index',
    imageUrl: '/static/share.png'
  }
})
</script>

<style scoped>
.my {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 3vh 4vw;
  background: white;
  border-radius: 2vw;
  margin-bottom: 2vh;
}

.avatar {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  margin-right: 3vw;
  background-color: #4a90e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.avatar-img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.login-text {
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
}

.login-text:active {
  opacity: 0.7;
}

.menu-group {
  background: white;
  border-radius: 2vw;
  margin-bottom: 2vh;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 2.5vh 4vw;
  border-bottom: 1px solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon-placeholder {
  width: 6vw;
  height: 6vw;
  margin-right: 3vw;
  background-color: transparent;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.menu-text {
  flex: 1;
  font-size: 1rem;
}

.arrow-placeholder {
  width: 5vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.2rem;
}


/* 星币卡片样式 */
.star-card {
  background: white;
  border-radius: 2vw;
  margin-bottom: 2vh;
  padding: 4vw;
}

.star-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
}

.star-amount {
  display: flex;
  align-items: center;
}

.amount {
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 2vw;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-right: 1vw;
}

.info-icon {
  width: 4vw;
  height: 4vw;
  border: 1px solid #999;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #999;
}

.recharge-btn {
  background: #ff6b9d;
  color: white;
  border: none;
  border-radius: 5vw;
  padding: 2vw 6vw;
  font-size: 0.9rem;
}

.task-list {
  border-top: 1px solid #f5f5f5;
  padding-top: 2vh;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
}

.task-item:last-child {
  margin-bottom: 0;
}

.task-left {
  display: flex;
  align-items: center;
}

.task-icon {
  width: 8vw;
  height: 8vw;
  border-radius: 1.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 3vw;
  font-size: 0.9rem;
}

.sign {
  background: #ff9f9f;
}

.share {
  background: #5e9cff;
}

.video {
  background: #ff6b9d;
}

.task-info {
  display: flex;
  flex-direction: column;
}

.task-name {
  font-size: 0.9rem;
  margin-bottom: 0.5vh;
}

.task-reward {
  font-size: 0.8rem;
  color: #999;
}

.task-status {
  font-size: 0.8rem;
}
.tasks{
  font-size: 0.8rem;
  margin-left: 100px;
}
.completed {
  color: #999;
}

.todo {
  color: #ff6b9d;
}
.nickname{
  font-size: 1.2rem;
  font-weight: bold;
}
.constellation{
  font-size: 0.8rem;
  color: #8e8e8e;
}
</style>



