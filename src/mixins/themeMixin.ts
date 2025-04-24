import { ref, onMounted, onUnmounted, watch } from 'vue'

export default function useTheme() {
  // 从本地存储获取主题色和深色模式状态
  const savedTheme = uni.getStorageSync('theme_color') || '#FF69B4'
  const savedDarkMode = uni.getStorageSync('dark_mode') === 'true'
  const currentTheme = ref(savedTheme)
  const isDarkMode = ref(savedDarkMode)
  
  // 深色模式的颜色
  const darkModeColor = '#1a237e' // 深蓝色
  
  // 应用主题色
  const applyTheme = () => {
    const themeColor = isDarkMode.value ? darkModeColor : currentTheme.value
    
    // 设置导航栏颜色
    try {
      uni.setNavigationBarColor({
        frontColor: isDarkMode.value ? '#ffffff' : '#000000',
        backgroundColor: themeColor,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    } catch (error) {
      console.error('设置导航栏颜色失败:', error)
    }
    
    // 设置全局CSS变量
    // #ifdef H5
    document.documentElement.style.setProperty('--theme-color', themeColor)
    document.documentElement.style.setProperty('--text-color', isDarkMode.value ? '#ffffff' : '#333333')
    document.documentElement.style.setProperty('--bg-color', isDarkMode.value ? '#121212' : '#f8f8f8')
    document.documentElement.style.setProperty('--card-bg-color', isDarkMode.value ? '#2c2c2c' : '#ffffff')
    document.documentElement.style.setProperty('--border-color', isDarkMode.value ? '#444' : '#f0f2f5')
    document.documentElement.style.setProperty('--icon-color', isDarkMode.value ? '#aaa' : '#999')
    document.documentElement.style.setProperty('--secondary-text-color', isDarkMode.value ? '#aaa' : '#666')
    document.body.className = isDarkMode.value ? 'dark-mode' : ''
    // #endif
  }
  
  // 监听主题变化事件
  const handleThemeChanged = (data: any) => {
    currentTheme.value = data.color
    isDarkMode.value = data.isDark
    applyTheme()
  }
  
  // 监听本地存储变化
  watch(() => [currentTheme.value, isDarkMode.value], () => {
    applyTheme()
  }, { immediate: true })
  
  onMounted(() => {
    // 应用保存的主题设置
    applyTheme()
    
    // 监听主题变化事件
    uni.$on('themeChanged', handleThemeChanged)
    
    // 监听页面显示事件，每次页面显示时重新应用主题
    uni.$on('pageShow', () => {
      applyTheme()
    })
  })
  
  onUnmounted(() => {
    // 移除事件监听
    uni.$off('themeChanged', handleThemeChanged)
    uni.$off('pageShow')
  })
  
  return {
    currentTheme,
    isDarkMode,
    darkModeColor,
    applyTheme
  }
}