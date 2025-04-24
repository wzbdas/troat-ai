import { onMounted, onUnmounted } from 'vue'

export default function useTheme() {
  // 设置当前页面的主题色
  const setPageTheme = (color: string) => {
    // #ifdef H5
    // H5端通过CSS变量设置
    document.documentElement.style.setProperty('--theme-color', color)
    // #endif
    
    // #ifdef MP-WEIXIN
    // 小程序端可以在这里添加特定实现
    try {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      // 可以尝试设置当前页面的一些属性
    } catch (error) {
      console.error('设置页面主题失败:', error)
    }
    // #endif
  }
  
  // 主题色变化处理函数
  const handleThemeChange = (color: string) => {
    setPageTheme(color)
  }
  
  onMounted(() => {
    // 获取当前主题色
    const currentTheme = uni.getStorageSync('theme_color') || '#FF69B4'
    setPageTheme(currentTheme)
    
    // 监听主题色变化事件
    uni.$on('themeColorChanged', handleThemeChange)
  })
  
  onUnmounted(() => {
    // 移除事件监听
    uni.$off('themeColorChanged', handleThemeChange)
  })
  
  return {
    setPageTheme
  }
}