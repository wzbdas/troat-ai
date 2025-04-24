<template>
  <view class="individuation">
    <view class="header">
      <text class="title">主题设置</text>
    </view>

    <!-- 主题色选择 -->
    <view class="section">
      <view class="section-title">主题色</view>
      <view class="color-grid">
        <view 
          v-for="(color, index) in themeColors" 
          :key="index"
          class="color-item"
          :class="{ active: currentTheme === color.value }"
          :style="{ backgroundColor: color.value }"
          @tap="selectTheme(color.value)"
        >
          <text v-if="currentTheme === color.value" class="check-icon">✓</text>
        </view>
      </view>
    </view>

    <!-- 深色模式设置 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">深色模式</text>
        <switch 
          :checked="isDarkMode" 
          @change="toggleDarkMode" 
          color="#FF69B4"
        />
      </view>
      <text class="section-desc">开启后将使用深色主题</text>
    </view>


    <!-- 恢复默认设置 -->
    <view class="reset-section">
      <button class="reset-btn" @tap="resetSettings">恢复默认设置</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

// 主题色列表
const themeColors = [
  { name: '默认', value: '#FFFFFF' },
  { name: '粉红', value: '#FF69B4' },
  { name: '蓝色', value: '#1E90FF' },
  { name: '绿色', value: '#32CD32' },
  { name: '紫色', value: '#9370DB' },
  { name: '橙色', value: '#FFA500' },
  { name: '红色', value: '#FF4500' }
]

// 从本地存储获取主题色和深色模式状态
const savedTheme = uni.getStorageSync('theme_color') || '#FF69B4'
const savedDarkMode = uni.getStorageSync('dark_mode') === 'true'
const currentTheme = ref(savedTheme)
const isDarkMode = ref(savedDarkMode)
const fontSize = ref(16)

// 深色模式的颜色
const darkModeColor = '#1a237e' // 深蓝色

// 应用主题色
const applyTheme = (color: string, isDark: boolean) => {
  const themeColor = isDark ? darkModeColor : color
  
  // 设置导航栏颜色
  try {
    uni.setNavigationBarColor({
      frontColor: isDark ? '#ffffff' : '#000000', // 深色模式使用白色前景
      backgroundColor: themeColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  } catch (error) {
    console.error('设置导航栏颜色失败:', error)
  }
  
  // 设置全局背景色
  // #ifdef H5
  document.documentElement.style.setProperty('--theme-color', themeColor)
  document.documentElement.style.setProperty('--text-color', isDark ? '#ffffff' : '#333333')
  document.documentElement.style.setProperty('--bg-color', isDark ? '#121212' : '#f8f8f8')
  document.body.className = isDark ? 'dark-mode' : ''
  // #endif
  
  // #ifdef MP-WEIXIN
  // 小程序端通过全局事件通知其他页面
  uni.$emit('themeChanged', { color: themeColor, isDark })
  // #endif
}

// 选择主题色
const selectTheme = (color: string) => {
  currentTheme.value = color
  
  // 保存主题色到本地存储
  uni.setStorageSync('theme_color', color)
  
  // 应用主题
  applyTheme(color, isDarkMode.value)
  
  uni.showToast({
    title: '主题色已更改',
    icon: 'success'
  })
}

// 切换深色模式
const toggleDarkMode = (e: any) => {
  isDarkMode.value = e.detail.value
  
  // 保存深色模式状态
  uni.setStorageSync('dark_mode', isDarkMode.value.toString())
  
  // 应用主题
  applyTheme(currentTheme.value, isDarkMode.value)
  
  uni.showToast({
    title: isDarkMode.value ? '已开启深色模式' : '已关闭深色模式',
    icon: 'success'
  })
}

// 修改字体大小
const changeFontSize = (e: any) => {
  fontSize.value = e.detail.value
}

// 重置设置
const resetSettings = () => {
  uni.showModal({
    title: '提示',
    content: '确定要恢复默认设置吗？',
    success: (res) => {
      if (res.confirm) {
        const defaultColor = '#FF69B4'
        currentTheme.value = defaultColor
        isDarkMode.value = false
        fontSize.value = 16
        
        // 保存默认设置
        uni.setStorageSync('theme_color', defaultColor)
        uni.setStorageSync('dark_mode', 'false')
        
        // 应用默认主题
        applyTheme(defaultColor, false)
        
        uni.showToast({
          title: '已恢复默认设置',
          icon: 'success'
        })
      }
    }
  })
}

// 组件挂载时初始化主题
onMounted(() => {
  // 应用保存的主题设置
  applyTheme(currentTheme.value, isDarkMode.value)
})
</script>

<style>
/* 全局样式 */
page {
  --theme-color: v-bind('isDarkMode ? darkModeColor : currentTheme');
  --text-color: v-bind('isDarkMode ? "#ffffff" : "#333333"');
  --bg-color: v-bind('isDarkMode ? "#121212" : "#f8f8f8"');
  background-color: var(--bg-color);
  color: var(--text-color);
}

/* 深色模式样式 */
.dark-mode {
  --section-bg: #2c2c2c;
  --border-color: #444;
}
</style>

<style scoped>
.individuation {
  min-height: 100vh;
  background-color: v-bind('isDarkMode ? "#121212" : "#f8f8f8"');
  padding: 4vw;
  transition: background-color 0.3s ease;
}

.header {
  padding: 4vw 0;
  border-bottom: 1px solid v-bind('isDarkMode ? "#444" : "#eee"');
}

.title {
  font-size: 1.2rem;
  font-weight: 500;
  color: v-bind('isDarkMode ? "#ffffff" : "#333"');
}

.section {
  margin: 6vw 0;
  padding: 4vw;
  background-color: v-bind('isDarkMode ? "#2c2c2c" : "#fff"');
  border-radius: 3vw;
  transition: background-color 0.3s ease;
}

.section-title {
  font-size: 1rem;
  color: v-bind('isDarkMode ? "#ffffff" : "#333"');
  margin-bottom: 4vw;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}

.section-desc {
  font-size: 0.8rem;
  color: v-bind('isDarkMode ? "#aaa" : "#999"');
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3vw;
}

.color-item {
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.color-item.active {
  border: 2px solid v-bind('isDarkMode ? "#444" : "#fff"');
  box-shadow: 0 0 0 2px v-bind('isDarkMode ? "#fff" : "#333"');
}

.check-icon {
  color: #fff;
  font-size: 0.9rem;
}

.font-size-control {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.size-label {
  font-size: 0.9rem;
  color: v-bind('isDarkMode ? "#aaa" : "#666"');
}

.size-label.large {
  font-size: 1.2rem;
}

.reset-section {
  margin-top: 10vw;
}

.reset-btn {
  width: 100%;
  height: 11vw;
  background: v-bind('isDarkMode ? "#2c2c2c" : "#fff"');
  color: #FF69B4;
  border: 1px solid #FF69B4;
  border-radius: 5.5vw;
  font-size: 1rem;
}
</style>