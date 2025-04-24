<template>
  <view class="container">
    <!-- 娃娃形象轮播图 -->
    <view class="doll-container">
      <swiper 
        class="doll-swiper" 
        circular 
        :interval="3000" 
        :duration="500" 
        @change="handleSwiperChange"
        :indicator-dots="false"
        :autoplay="true"
      >
        <swiper-item v-for="(doll, index) in 4" :key="index">
          <image 
            :src="`../../../static/index/wa${index + 1}.png`" 
            mode="aspectFit" 
            class="doll-image"
            lazy-load
          ></image>
        </swiper-item>
      </swiper>
      <text class="doll-name">{{ getDollName }}</text>
    </view>

    <!-- 欢迎语 -->
    <view class="welcome-text">
      <text>{{ getDollDescription }}</text>
    </view>

    <!-- 倾诉输入框 -->
    <view class="confession-box">
      <textarea
        v-model="confessionText"
        class="confession-input"
        placeholder="写下烦恼，让我来封印它~（200以内）"
        maxlength="200"
        @input="handleInput"
        :disable-default-padding="true"
      ></textarea>
      <text class="word-count">{{ confessionText.length }}/200</text>
    </view>

    <!-- 按钮组 -->
    <view class="button-group">
      <view 
        class="submit-btn" 
        @click="submitConfession"
        :class="{'btn-disabled': !canSubmit}"
      >倾诉</view>
      <view class="memory-btn" @click="navigateToMemory">我的回忆</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { getDollList, addMemory } from '../../../servers/index'

// 娃娃列表数据
const dollList = ref<any[]>([])
// 当前轮播图索引
const currentIndex = ref(0)
// 倾诉文本
const confessionText = ref('')
// 是否正在提交
const isSubmitting = ref(false)

// 计算属性：获取当前娃娃名称
const getDollName = computed(() => {
  if (!dollList.value.length) return '加载中...'
  return dollList.value[currentIndex.value]?.name || '神秘娃娃'
})

// 计算属性：获取当前娃娃描述
const getDollDescription = computed(() => {
  if (!dollList.value.length) return '我感化为温暖的回忆，陪伴着你，当你感到忧愁时，让我来唤起你心中美好的回忆，给予你力量💖'
  return dollList.value[currentIndex.value]?.description || '我感化为温暖的回忆，陪伴着你，当你感到忧愁时，让我来唤起你心中美好的回忆，给予你力量💖'
})

// 计算属性：是否可以提交
const canSubmit = computed(() => {
  return confessionText.value.trim().length > 0 && 
         dollList.value.length > 0 && 
         !isSubmitting.value
})

// 获取娃娃列表 - 使用防抖处理
let fetchTimer: any = null
const fetchDollList = async () => {
  if (fetchTimer) clearTimeout(fetchTimer)
  
  fetchTimer = setTimeout(async () => {
    try {
      const res = await getDollList()
      if (res && res.data && res.data.data) {
        dollList.value = res.data.data
      }
    } catch (error) {
      console.error('获取娃娃列表失败:', error)
      uni.showToast({
        title: '获取娃娃列表失败',
        icon: 'none'
      })
    }
  }, 300)
}

// 页面加载时获取数据
onMounted(() => {
  nextTick(() => {
    fetchDollList()
  })
})

// 导航到我的回忆页面
const navigateToMemory = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/Memory'
  })
}

// 处理输入 - 使用防抖优化
let inputTimer: any = null
const handleInput = (e: any) => {
  if (inputTimer) clearTimeout(inputTimer)
  
  inputTimer = setTimeout(() => {
    confessionText.value = e.detail.value
  }, 100)
}

// 处理轮播图切换
const handleSwiperChange = (e: any) => {
  currentIndex.value = e.detail.current
}

// 提交倾诉
const submitConfession = async () => {
  if (!canSubmit.value) return
  
  isSubmitting.value = true
  
  try {
    const now = new Date()
    const formattedDate = now.toISOString()

    const res = await addMemory({
      memory_text: confessionText.value,
      doll_id: currentIndex.value + 1,
      created_at: formattedDate
    })
    
    if (res.data.code === 200) {
      uni.showToast({
        title: '已收到您的倾诉',
        icon: 'success'
      })
      confessionText.value = ''
    } else {
      uni.showToast({
        title: res?.data?.msg || '提交失败，请稍后重试',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('提交倾诉失败:', error)
    uni.showToast({
      title: '网络错误，请稍后重试',
      icon: 'none'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: white;
  padding: 20rpx;
  position: relative;
  box-sizing: border-box;
}

.doll-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40rpx 0;
  will-change: transform;
}

.doll-swiper {
  width: 100%;
  height: 300rpx;
  will-change: transform;
}

.doll-image {
  width: 300rpx;
  height: 300rpx;
  margin: 0 auto;
  display: block;
  transition: transform 0.3s ease;
  will-change: transform;
  backface-visibility: hidden;
}

.doll-name {
  color: #7a9fe4;
  font-size: 32rpx;
  margin-top: 20rpx;
  font-weight: bold;
}

.welcome-text {
  color: #888;
  text-align: center;
  padding: 20rpx 40rpx;
  line-height: 1.6;
  font-size: 28rpx;
  background-color: rgba(168, 199, 250, 0.1);
  border-radius: 15rpx;
  margin: 0 20rpx;
}

.confession-box {
  background: linear-gradient(135deg, #87CEEB, #4169E1);
  border-radius: 20rpx;
  padding: 20rpx;
  margin: 30rpx 20rpx;
  position: relative;
  box-shadow: 0 6rpx 15rpx rgba(65, 105, 225, 0.2);
  will-change: transform;
}

.confession-input {
  width: 100%;
  height: 300rpx;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: transparent;
}

.confession-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.word-count {
  position: absolute;
  bottom: 10rpx;
  right: 20rpx;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin: 40rpx 60rpx;
}

.submit-btn {
  background: linear-gradient(135deg, #87CEEB, #4169E1);
  color: #fff;
  text-align: center;
  padding: 25rpx;
  border-radius: 50rpx;
  font-size: 32rpx;
  box-shadow: 0 4rpx 10rpx rgba(65, 105, 225, 0.4);
  transition: all 0.3s ease;
  font-weight: bold;
  will-change: transform, opacity;
}

.btn-disabled {
  opacity: 0.6;
  background: linear-gradient(135deg, #a8c7fa, #7a9fe4);
}

.memory-btn {
  background: linear-gradient(135deg, #a8c7fa, #7a9fe4);
  color: #fff;
  text-align: center;
  padding: 25rpx;
  border-radius: 50rpx;
  font-size: 32rpx;
  box-shadow: 0 4rpx 10rpx rgba(122, 159, 228, 0.4);
  transition: all 0.3s ease;
  will-change: transform, opacity;
}

.submit-btn:active,
.memory-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}

@media (prefers-reduced-motion: reduce) {
  .doll-image,
  .submit-btn,
  .memory-btn {
    transition: none;
  }
}
</style>