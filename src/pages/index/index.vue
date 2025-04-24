<template>
  <view class="container">
    <!-- 顶部用户信息 -->
    <view class="user-info">
      <view class="user-avatar">
        <image src="../../static/index/imagetarot.png" mode="aspectFit" class="zodiac-icon"></image>
      </view>
      <view class="user-detail">
        <text class="user-name">{{ userName }}</text>
        <text class="user-zodiac">{{ userBirthday }}</text>
        <text class="user-zodiac">{{ userArea }}</text>
      </view>
      <view class="user-actions">
        <button class="edit-btn"
        @click="navigateToLocalArchives"
        >编辑</button>
      </view>
    </view>

    <!-- 活动通知栏 -->
    <view class="notice-bar">
      <image src="../../static/index/message.png" mode="aspectFit" class="notice-icon"></image>
      <view class="notice-text-container">
        <view class="notice-text">{{ noticeText }}</view>
      </view>
    </view>

    <!-- 今日运势指数 -->
    <view class="fortune-card">
      <view class="card-header">
        <text class="card-yunshi">今日运势</text>
        <text class="star-rating">★★★★☆</text>
      </view>
      
      <view class="fortune-items">
        <view class="fortune-item">
          <text class="item-label">事业</text>
          <view class="progress-bar">
            <view class="progress" :style="{ width: fortuneData.career + '%' }"></view>
          </view>
          <text class="percentage">{{ fortuneData.career }}%</text>
        </view>
        
        <view class="fortune-item">
          <text class="item-label">爱情</text>
          <view class="progress-bar">
            <view class="progress" :style="{ width: fortuneData.love + '%' }"></view>
          </view>
          <text class="percentage">{{ fortuneData.love }}%</text>
        </view>
        
        <view class="fortune-item">
          <text class="item-label">财富</text>
          <view class="progress-bar">
            <view class="progress" :style="{ width: fortuneData.wealth + '%' }"></view>
          </view>
          <text class="percentage">{{ fortuneData.wealth }}%</text>
        </view>

        <view class="fortune-item">
          <text class="item-label">健康</text>
          <view class="progress-bar">
            <view class="progress" :style="{ width: fortuneData.health + '%' }"></view>
          </view>
          <text class="percentage">{{ fortuneData.health }}%</text>
        </view>
      </view>
      
      <view class="card-footer">
        <text class="view-more" @click="navigateToLookMore">查看更多</text>
      </view>
    </view>

    <!-- 功能导航区 -->
    <view class="nav-grid">
      <view class="nav-row">
        <view class="nav-item">
          <image src="../../static/index/mbi.png" mode="aspectFit" class="nav-icon"></image>
          <text class="nav-text"  @click="navigateToHeartTest">性格测试</text>
        </view>
        <view class="nav-item">
          <image src="../../static/index/daan.png" mode="aspectFit" class="nav-icon"></image>
          <text class="nav-text" @click="navigateToAnswerBook">答案之书</text>
        </view>
        <view class="nav-item">
          <image src="../../static/index/taro.png" mode="aspectFit" class="nav-icon"></image>
          <text class="nav-text" @click="navigateToTarot">塔罗牌</text>
        </view>
        <view class="nav-item">
          <image src="../../static/index/bazi.png" mode="aspectFit" class="nav-icon"></image>
          <text class="nav-text" @click="navigateToBazi">生辰八字</text>
        </view>
      </view>
    </view>
    <!-- 内心倾诉 -->
    <view class="confession-section">
      <view class="section-header">
        <text class="emoji">🌟</text>
        <text class="section-title">内心倾诉</text>
        <text class="clear-btn">清除负能量</text>
      </view>
      
      <view class="feature-cards">
        <view class="feature-card tree-hole">
          <view class="card-content">
            <text class="card-title">树洞</text>
            <text class="card-subtitle">倾诉秘密之地</text>
            <view class="card-arrow" @click="navigateToTree">→</view>
          </view>
        </view>
        
        <view class="feature-card worry-doll">
          <view class="card-content">
            <text class="card-title">解忧娃娃</text>
            <text class="card-subtitle">封印你的烦恼</text>
            <view class="card-arrow" @click="navigateToDollas">→</view>
          </view>
        </view>
      </view>

    

      <view class="section-header">
        <text class="emoji">✨</text>
        <text class="section-title">理顺能量场</text>
      </view>

      <view class="feature-cards">
        <view class="feature-card meditation">
          <view class="card-content">
            <text class="card-title">冥想</text>
            <text class="card-subtitle">心灵宁静之旅</text>
            <view class="card-arrow" @click="navigateTomeditation">→</view>
          </view>
        </view>
        
        <view class="feature-card wooden-fish">
          <view class="card-content">
            <text class="card-title">木鱼</text>
            <text class="card-subtitle">平和心境之音</text>
            <view class="card-arrow" @click="navigateTomuyu">→</view>
          </view>
        </view>
      </view>
      <view class="divider">
        <text class="divider-text">仅供娱乐</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { generateFortuneData } from '@/utils/fortuneGenerator'

interface Users {
  name: string
  birthday: string
  area: string
}

interface FortuneData {
  career: number
  love: number
  wealth: number
  health: number
}

const userName = ref('游客')  // 设置默认值
const userBirthday = ref('未设置')  // 设置默认值
const userArea = ref('未设置')  // 设置默认值
const noticeText = ref('各种活动火热进行中，欢迎报名参加！ APP版本有更多功能，敬请下载使用！')
const fortuneData = ref<FortuneData>({
  career: 0,
  love: 0,
  wealth: 0,
  health: 0
})

// 更新运势数据
const updateFortuneData = () => {
  const Users = uni.getStorageSync('Users')
  if (Users) {
    const { birthday, area } = Users
    const data = generateFortuneData(birthday || '2000-01-01', area || '北京')
    fortuneData.value = data
  } else {
    // 如果没有用户信息，使用默认值生成运势
    const data = generateFortuneData('2000-01-01', '北京')
    fortuneData.value = data
  }
}

// 更新用户信息
const updateUsers = () => {
  try {
    const UsersStr = uni.getStorageSync('Users')
    console.log('获取到的用户信息:', UsersStr)
    
    if (UsersStr) {
      // 尝试解析JSON字符串（如果存储的是字符串形式）
      let Users
      if (typeof UsersStr === 'string') {
        try {
          Users = JSON.parse(UsersStr)
        } catch (e) {
          Users = UsersStr
        }
      } else {
        Users = UsersStr
      }
      
      if (Users) {
        userName.value = Users.name || '游客'
        userBirthday.value = Users.birthday || '未设置'
        userArea.value = Users.area || '未设置'
        updateFortuneData()
      }
    } else {
      // 如果没有用户信息，设置默认值
      setDefaultUsers()
    }
  } catch (e) {
    console.error('获取用户信息出错:', e)
    setDefaultUsers()
  }
}

// 设置默认用户信息
const setDefaultUsers = () => {
  userName.value = '游客'
  userBirthday.value = '未设置'
  userArea.value = '未设置'
  
  // 生成默认运势数据
  updateFortuneData()
}

// 监听用户信息更新事件 
const handleUsersUpdate = (Users: any) => {
  console.log('收到用户信息更新事件:', Users)
  if (Users) {
    userName.value = Users.name || '游客'
    userBirthday.value = Users.birthday || '未设置'
    userArea.value = Users.area || '未设置'
    updateFortuneData()
  }
}

// 页面加载时获取数据
onMounted(() => {
  console.log('页面加载，开始获取用户信息')
  updateUsers()
  // 添加事件监听
  uni.$on('updateUsers', handleUsersUpdate)
})

// 确保每次页面显示时都更新用户信息
onShow(() => {
  console.log('页面显示，更新用户信息')
  updateUsers()
})

// 页面卸载时移除事件监听
onUnmounted(() => {
  uni.$off('updateUsers', handleUsersUpdate)
})
import type { _ViewProps, _TextProps, _ImageProps, _ButtonProps } from '@dcloudio/types'

// Declare component types for uni-app
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    view: _ViewProps
    text: _TextProps
    image: _ImageProps
    button: _ButtonProps
  }
}

// 导航方法
const navigateToLocalArchives = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/LocalArchives'
  })
}

const navigateToLookMore = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/LookMore'
  })
}

const navigateToHeartTest = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/HeartTest'
  })
}

const navigateToAnswerBook = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/AnswerBook'
  })
}
const navigateToBazi = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/Bazi'
  })
}

const navigateToTarot = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/Tarot'
  })
}

const navigateToTree = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/Tree'
  })
}

const navigateToDollas = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/dollas'
  })
}
const navigateTomeditation = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/meditation'
  }) 
}
const navigateTomuyu = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/muyu'
  })
} 
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #FFF0F5;
  padding: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  overflow: hidden;
  background: #f0f0f0;
}

.zodiac-icon {
  width: 100%;
  height: 100%;
}

.user-detail {
  flex: 1;
  margin-left: 20rpx;
}

.user-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.user-zodiac {
  font-size: 24rpx;
  color: #666;
  display: block;
  margin-top: 4rpx;
}

.user-actions {
  display: flex;
  align-items: center;
}

.edit-btn {
  font-size: 24rpx;
  padding: 8rpx 20rpx;
  background: #FFB6C1;
  color: #fff;
  border-radius: 30rpx;
  margin-right: 20rpx;
}

.notice-bar {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 20rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.notice-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
  flex-shrink: 0;
}

.notice-text-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.notice-text {
  white-space: nowrap;
  font-size: 26rpx;
  color: #666;
  animation: scrollText 15s linear infinite;
}

@keyframes scrollText {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.app-version {
  font-size: 24rpx;
  color: #999;
  margin-left: 10rpx;
  flex-shrink: 0;
}

.fortune-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.star-rating {
  margin-left: 20rpx;
  color: #FFB6C1;
}

.fortune-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.item-label {
  width: 80rpx;
  font-size: 26rpx;
  color: #666;
}

.progress-bar {
  flex: 1;
  height: 20rpx;
  background: #f0f0f0;
  border-radius: 10rpx;
  margin: 0 20rpx;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #FFB6C1, #FF69B4);
  border-radius: 10rpx;
}

.percentage {
  font-size: 24rpx;
  color: #999;
  width: 60rpx;
}

.card-footer {
  text-align: center;
  margin-top: 20rpx;
}

.view-more {
  font-size: 26rpx;
  color: #999;
}

.nav-grid {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
}

.nav-row {
  display: flex;
  justify-content: space-between;
}

.nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
}

.nav-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.nav-text {
  font-size: 24rpx;
  color: #666;
}

.hot-tag {
  position: absolute;
  top: -10rpx;
  right: 10rpx;
  background: #FF69B4;
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 10rpx;
  border-radius: 20rpx;
}

.confession-section {
  margin-top: 20rpx;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.emoji {
  font-size: 40rpx;
  margin-right: 10rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  flex: 1;
}

.clear-btn {
  font-size: 24rpx;
  color: #666;
  padding: 8rpx 20rpx;
  background: rgba(255, 182, 193, 0.1);
  border-radius: 30rpx;
}

.feature-cards {
  display: flex;
  padding: 20rpx;
  gap: 20rpx;
}

.feature-card {
  flex: 1;
  height: 160rpx;
  border-radius: 16rpx;
  padding: 20rpx;
  position: relative;
  overflow: hidden;
}

.tree-hole {
  background: linear-gradient(135deg, #90EE90, #32CD32);
}

.worry-doll {
  background: linear-gradient(135deg, #87CEEB, #4169E1);
}

.meditation {
  background: linear-gradient(135deg, #DDA0DD, #9370DB);
}

.wooden-fish {
  background: linear-gradient(135deg, #DEB887, #8B4513);
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.card-subtitle {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.card-arrow {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.8);
}

.divider {
  text-align: center;
  margin: 30rpx 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #ddd;
}

.divider::before {
  left: 15%;
}

.divider::after {
  right: 15%;
}

.divider-text {
  display: inline-block;
  padding: 0 20rpx;
  font-size: 24rpx;
  color: #999;
  background: #FFF0F5;
}
</style>
