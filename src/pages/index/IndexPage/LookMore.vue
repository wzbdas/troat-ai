<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <text class="back-btn" @click="goBack">返回</text>
      <text class="title">今日运势</text>
      <view class="date-picker">
        <picker mode="date" :value="currentDate" @change="onDateChange">
          <text>{{ currentDate }}</text>
        </picker>
      </view>
    </view>

    <!-- 用户信息卡片 -->
    <view class="user-card">
      <image class="avatar" src="../../../static/index/imagetarot.png"></image>
      <view class="user-info">
        <text class="username">{{ userName }}</text>
        <text class="birth-info">{{ userBirthday }}</text>
      </view>
    </view>

    <!-- 运势指数卡片 -->
    <view class="fortune-card">
      <text class="card-title">运势指数</text>
      <view class="progress-list">
        <view class="progress-item" v-for="(item, index) in fortuneItems" :key="index">
          <view class="progress-label">
            <text>{{ item.label }}</text>
            <text class="progress-value">{{ item.value }}%</text>
          </view>
          <view class="progress-bar">
            <view class="progress-fill" :style="{ width: item.value + '%', backgroundColor: item.color }"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 幸运物信息卡片 -->
    <view class="lucky-card">
      <text class="card-title">今日幸运</text>
      <view class="lucky-items">
        <view class="lucky-item">
          <text class="item-label">幸运色</text>
          <text class="item-value">{{ luckyInfo.color }}</text>
        </view>
        <view class="lucky-item">
          <text class="item-label">幸运数字</text>
          <text class="item-value">{{ luckyInfo.number }}</text>
        </view>
        <view class="lucky-item">
          <text class="item-label">吉利方位</text>
          <text class="item-value">{{ luckyInfo.direction }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 用户信息
const userName = ref('自己...')
const userBirthday = ref('2000-03-01')
const userArea = ref('北京朝阳区')

// 从本地存储读取用户信息
onMounted(() => {
  const storedUser = uni.getStorageSync('userInfo')
  if (storedUser) {
    userName.value = storedUser.name
    userBirthday.value = storedUser.birthday
    userArea.value = storedUser.area
    updateFortuneData()
    generateLuckyInfo()
  }

  // 添加事件监听
  uni.$on('updateUserInfo', (user) => {
    userBirthday.value = user.birthday
    userArea.value = user.area
    updateFortuneData()
    generateLuckyInfo()
  })
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
  uni.$off('updateUserInfo')
})

// 幸运物信息数据
const luckyColors = ['红色', '橙色', '黄色', '绿色', '蓝色', '紫色', '粉色', '白色', '金色']
const luckyDirections = ['东', '南', '西', '北', '东南', '东北', '西南', '西北']
const luckyInfo = ref({
  color: '粉色',
  number: 6,
  direction: '东南'
})

// 生成随机幸运信息
const generateLuckyInfo = () => {
  // 使用用户生日作为随机种子，确保同一用户在同一天获得相同的幸运信息
  const date = new Date(userBirthday.value)
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  
  // 使用种子生成随机数
  const random = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }

  luckyInfo.value = {
    color: luckyColors[random(0, luckyColors.length - 1)],
    number: random(1, 9),
    direction: luckyDirections[random(0, luckyDirections.length - 1)]
  }
}

// 日期选择
const currentDate = ref(new Date().toISOString().split('T')[0])
const onDateChange = (e: any) => {
  currentDate.value = e.detail.value
  generateLuckyInfo() // 日期改变时更新幸运信息
}

import { generateFortuneData } from '@/utils/fortuneGenerator'

// 运势指数数据
const fortuneItems = ref([
  { label: '综合运势', value: 88, color: '#FFB6C1' },
  { label: '事业运势', value: 0, color: '#87CEEB' },
  { label: '感情运势', value: 0, color: '#98FB98' },
  { label: '财运指数', value: 0, color: '#DDA0DD' },
  { label: '健康指数', value: 0, color: '#F0E68C' }
])

// 更新运势数据
const updateFortuneData = () => {
  if (userBirthday.value && userArea.value) {
    const fortune = generateFortuneData(userBirthday.value, userArea.value)
    fortuneItems.value[1].value = fortune.career
    fortuneItems.value[2].value = fortune.love
    fortuneItems.value[3].value = fortune.wealth
    fortuneItems.value[4].value = fortune.health
    // 综合运势取平均值
    fortuneItems.value[0].value = Math.round((fortune.career + fortune.love + fortune.wealth + fortune.health) / 4)
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.back-btn {
  font-size: 28rpx;
  color: #666;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.date-picker {
  font-size: 28rpx;
  color: #666;
}

.user-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx 0;
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 20rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.birth-info {
  font-size: 24rpx;
  color: #999;
}

.fortune-card, .lucky-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx 0;
}

.card-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  display: block;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.progress-item {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
  font-size: 26rpx;
}

.progress-value {
  color: #666;
}

.progress-bar {
  height: 16rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.lucky-items {
  display: flex;
  justify-content: space-between;
}

.lucky-item {
  text-align: center;
}

.item-label {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 10rpx;
  display: block;
}

.item-value {
  font-size: 30rpx;
  color: #333;
  font-weight: bold;
}
</style>