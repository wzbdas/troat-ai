<script lang="ts">
export default {
  onShow() {
    // 触发页面显示事件
    uni.$emit('pageShow')
  },
  onLaunch: function() {
    console.log('App Launch')
    
    // 初始化主题色和深色模式
    const savedTheme = uni.getStorageSync('theme_color') || '#FF69B4'
    const isDarkMode = uni.getStorageSync('dark_mode') === 'true'
    const darkModeColor = '#1a237e' // 深蓝色
    const themeColor = isDarkMode ? darkModeColor : savedTheme
    
    // #ifdef H5
    document.documentElement.style.setProperty('--theme-color', themeColor)
    document.documentElement.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#333333')
    document.documentElement.style.setProperty('--bg-color', isDarkMode ? '#121212' : '#f8f8f8')
    document.documentElement.style.setProperty('--card-bg-color', isDarkMode ? '#2c2c2c' : '#ffffff')
    document.documentElement.style.setProperty('--border-color', isDarkMode ? '#444' : '#f0f2f5')
    document.documentElement.style.setProperty('--icon-color', isDarkMode ? '#aaa' : '#999')
    document.documentElement.style.setProperty('--secondary-text-color', isDarkMode ? '#aaa' : '#666')
    if (isDarkMode) {
      document.body.className = 'dark-mode'
    }
    // #endif
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
/* 全局主题变量 */
:root {
  --theme-color: #FF69B4;
  --text-color: #333333;
  --bg-color: #f8f8f8;
  --card-bg-color: #ffffff;
  --border-color: #f0f2f5;
  --icon-color: #999;
  --secondary-text-color: #666;
}

/* 深色模式样式 */
.dark-mode {
  --theme-color: #1a237e;
  --text-color: #ffffff;
  --bg-color: #121212;
  --card-bg-color: #2c2c2c;
  --border-color: #444;
  --icon-color: #aaa;
  --secondary-text-color: #aaa;
}

/* 应用全局背景色 */
page {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
