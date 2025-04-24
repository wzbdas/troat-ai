<script lang="ts" setup>
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {
  // 初始化主题色和深色模式
  const savedTheme = uni.getStorageSync('theme_color') || '#FF69B4'
  const isDarkMode = uni.getStorageSync('dark_mode') === 'true'
  const darkModeColor = '#1a237e' // 深蓝色
  const themeColor = isDarkMode ? darkModeColor : savedTheme
  
  // #ifdef H5
  document.documentElement.style.setProperty('--theme-color', themeColor)
  document.documentElement.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#333333')
  document.documentElement.style.setProperty('--bg-color', isDarkMode ? '#121212' : '#f8f8f8')
  if (isDarkMode) {
    document.body.className = 'dark-mode'
  }
  // #endif
  
  // #ifdef MP-WEIXIN
  // 监听主题变化事件
  uni.$on('themeChanged', (data: {color: string, isDark: boolean}) => {
    console.log('主题已更改:', data)
    // 可以在这里执行小程序特定的全局主题设置
  })
  // #endif
})
</script>

<style>
/* 全局CSS变量 */
:root {
  --theme-color: #FF69B4;
  --text-color: #333333;
  --bg-color: #f8f8f8;
  --section-bg: #ffffff;
  --border-color: #eeeeee;
}

/* 全局页面背景色 */
page {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 深色模式样式 */
.dark-mode {
  --theme-color: #1a237e;
  --text-color: #ffffff;
  --bg-color: #121212;
  --section-bg: #2c2c2c;
  --border-color: #444444;
}
</style>
