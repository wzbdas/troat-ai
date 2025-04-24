<template>
  <view class="dream-detail">
    <view class="dream-query">
      <text class="query-label">您的梦境：</text>
      <text class="query-content">{{ dreamContent }}</text>
    </view>
    
    <view v-for="(section, index) in analysisContent" 
          :key="index" 
          class="section"
          :class="{'animate-in': true}" 
          :style="{ animationDelay: index * 300 + 'ms' }">
      <text class="section-title">{{ section.title }}</text>
      <rich-text v-if="!section.isRaw" 
                 :nodes="section.content" 
                 class="section-content"></rich-text>
      <text v-else class="section-content">{{ section.content }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dreamContent = ref('')
const analysisContent = ref([])

// 解析分析内容
const parseAnalysis = (analysisText) => {
  try {
    // 预处理 Markdown 格式
    let cleanText = analysisText
      // 处理其他 Markdown 格式
      .replace(/#{1,6}\s*(.*?)(?:\n|$)/g, '$1\n')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')

    // 直接按数字序号分割内容
    const sections = cleanText.split(/\d+\.\s+/).filter(Boolean)
    
    return sections.map((content, index) => {
      let processedContent = content.trim()
      
      // 从内容中提取标题
      const titleMatch = processedContent.match(/^(梦境的整体概述|梦境中关键元素的象征意义|潜意识心理状态分析|与现实生活的关联|建设性的建议和启示)[:：]?\s*(.*)$/s)
      
      let title, mainContent
      if (titleMatch) {
        title = titleMatch[1]
        mainContent = titleMatch[2]
      } else {
        title = `第${index + 1}部分`
        mainContent = processedContent
      }
      
      // 处理关键词高亮
      const keywords = ['象征', '暗示', '预示', '反映', '表明']
      keywords.forEach(keyword => {
        mainContent = mainContent.replace(
          new RegExp(`(${keyword})`, 'g'),
          '<span class="highlight">$1</span>'
        )
      })

      // 处理换行
      mainContent = mainContent.replace(/\n/g, '<br>')

      return {
        title,
        content: mainContent,
        isRaw: false
      }
    })
  } catch (err) {
    console.error('解析分析内容失败:', err)
    return [{
      title: '解析结果',
      content: analysisText
        .replace(/#{1,6}\s*(.*?)(?:\n|$)/g, '<strong>$1</strong>\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>'),
      isRaw: false
    }]
  }
}

onMounted(() => {
  try {
    // 获取页面参数
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.$page?.options || {}
    
    console.log('页面参数:', options) // 调试用
    
    if (options.content) {
      dreamContent.value = decodeURIComponent(options.content)
    }
    
    if (options.analysis) {
      const decodedAnalysis = decodeURIComponent(options.analysis)
      console.log('解析内容:', decodedAnalysis) // 调试用
      analysisContent.value = parseAnalysis(decodedAnalysis)
    }
  } catch (error) {
    console.error('获取页面参数失败:', error)
    // 显示错误提示
    uni.showToast({
      title: '加载失败，请重试',
      icon: 'none'
    })
  }
})
</script>

<style scoped>
.dream-detail {
  padding: 30rpx;
  background: #fff;
  min-height: 100vh;
}

.dream-query {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
}

.query-label {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.query-content {
  font-size: 28rpx;
  color: #666;
}

.section {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #ff85a2;
  margin-bottom: 16rpx;
  display: block;
}

.section-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

.highlight {
  color: #ff85a2;
  font-weight: bold;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}
</style>