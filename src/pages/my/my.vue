

<template>
  <div class="my">
    <!-- 头部登录/注册区域 -->
    <div class="header" @click="goToLogin">
      <div class="avatar"><img class="avatar-img" src="../../img/7.png" alt=""></div>
      <div class="login-text">登录/注册</div>
    </div>

    <!-- 星币卡片 - 登录后显示 -->
    <div class="star-card" v-if="hasToken">
      <div class="star-header">
        <div class="star-amount">
          <text class="amount">600</text>
          <text class="label">我的星币</text>
          <text class="info-icon" @click="showStarInfo">?</text>
        </div>
        <button class="recharge-btn" @click="handleRecharge">星币充值</button>
      </div>

      <div class="task-list">
        <div class="task-item">
          <div class="task-left">
            <div class="task-icon sign">签</div>
            <div class="task-info">
              <div class="task-name">签到</div>
              <div class="task-reward">奖励50星币</div>
            </div>
          </div>
          <div class="task-status completed">已完成</div>
        </div>

        <div class="task-item">
          <div class="task-left">
            <div class="task-icon share">分</div>
            <div class="task-info">
              <div class="task-name">分享</div>
              <div class="task-reward">奖励50星币 | 今日剩余0次</div>
            </div>
          </div>
          <div class="task-status completed">已完成</div>
        </div>

        <div class="task-item">
          <div class="task-left">
            <div class="task-icon video">视</div>
            <div class="task-info">
              <div class="task-name">视频广告</div>
              <div class="task-reward">奖励50星币 | 今日剩余5次</div>
            </div>
          </div>
          <div class="task-status todo" @click="watchVideo">去完成</div>
        </div>
      </div>
    </div>

    <!-- 用户功能列表 -->
    <div class="menu-group">
      <div class="menu-item" v-for="(item, index) in menuList1" :key="index">
        <div class="icon-placeholder" :style="{color: item.color}">{{ item.iconText }}</div>
        <span class="menu-text">{{ item.text }}</span>
        <div class="arrow-placeholder">›</div>
      </div>
    </div>

    <!-- 记录相关功能 -->
    <div class="menu-group">
      <div class="menu-item" v-for="(item, index) in menuList2" :key="index">
        <div class="icon-placeholder" :style="{color: item.color}">{{ item.iconText }}</div>
        <span class="menu-text">{{ item.text }}</span>
        <div class="arrow-placeholder">›</div>
      </div>
    </div>

    <!-- 分享和其他功能 -->
    <div class="menu-group">
      <div class="menu-item" v-for="(item, index) in menuList3" :key="index">
        <div class="icon-placeholder" :style="{color: item.color}">{{ item.iconText }}</div>
        <span class="menu-text">{{ item.text }}</span>
        <div class="arrow-placeholder">›</div>
      </div>
    </div>
    
    <!-- 设置 -->
    <div class="menu-group">
      <div class="menu-item">
        <div class="icon-placeholder" style="color: #4cd4de;">设</div>
        <span class="menu-text">设置</span>
        <div class="arrow-placeholder">›</div>
      </div>
      <!-- 添加退出登录按钮 -->
      <div class="menu-item" v-if="hasToken" @click="handleLogout">
        <div class="icon-placeholder" style="color: #ff6b6b;">退</div>
        <span class="menu-text">退出登录</span>
        <div class="arrow-placeholder">›</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/stores/modules/member'

// 获取store实例
const memberStore = useMemberStore()

// 检查是否有token
const hasToken = ref(false)

onMounted(() => {
  // 使用 getToken 方法获取 token
  hasToken.value = !!memberStore.getToken()
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
  uni.showToast({
    title: '跳转充值页面',
    icon: 'none'
  });
};

// 观看视频
const watchVideo = () => {
  uni.showToast({
    title: '播放广告视频',
    icon: 'none'
  });
};

// 添加跳转到登录页面的方法
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  });
};

const menuList1 = ref<MenuItem[]>([
  { iconText: '档', text: '档案管理', color: '#ff6b6b' },
  { iconText: '报', text: '已购报告', color: '#4cd964' },
  { iconText: '券', text: '我的卡券', color: '#ffcc00' },
  { iconText: '单', text: '我的订单', color: '#ff9f9f' },
  { iconText: '活', text: '我的活动', color: '#ff9f7f' },
]);

const menuList2 = ref<MenuItem[]>([
  { iconText: '问', text: '问题记录', color: '#ff7d9e' },
  { iconText: 'AI', text: 'AI解读记录', color: '#5e9cff' },
]);

const menuList3 = ref<MenuItem[]>([
  { iconText: '分', text: '分享', color: '#d14af5' },
  { iconText: '邀', text: '邀请好友填写档案', color: '#ff9f7f' },
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
        memberStore.setToken('')  // 清除token
        hasToken.value = false
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}
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

.completed {
  color: #999;
}

.todo {
  color: #ff6b9d;
}
</style>

