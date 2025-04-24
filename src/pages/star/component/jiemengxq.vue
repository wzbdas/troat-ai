<template>
  <view class="dream-detail">

    <view class="content-container">
      <view v-if="loading" class="loading-container">
        <view class="loading-animation">
          <view class="loading-circle" v-for="i in 3" :key="i"></view>
        </view>
        <text class="loading-text">正在解析梦境...</text>
      </view>
      
      <view v-else-if="error" class="error-container">
        <text class="error-icon">!</text>
        <text class="error-message">{{ error }}</text>
        <button class="retry-button" @tap="retryAnalysis">重新解析</button>
      </view>
      
      <view v-else class="dream-content">
        <view class="dream-query">
          <text class="query-label">您的梦境：</text>
          <text class="query-content">{{ dreamContent }}</text>
        </view>
        
        <view 
          v-for="(section, index) in analysisContent" 
          :key="index" 
          class="section" 
          :class="{'animate-in': true}" 
          :style="{ animationDelay: index * 300 + 'ms' }"
        >
          <text class="section-title">{{ section.title }}</text>
          <rich-text 
            v-if="section.isRaw === false" 
            :nodes="section.content" 
            class="section-content"
          ></rich-text>
          <text v-else class="section-content">{{ section.content }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { analyzeDream as analyzeRequest } from '../../../servers/star'

// 获取页面参数
const dreamContent = ref('');
const analysisContent = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.$page?.options || {};
  
  dreamContent.value = decodeURIComponent(options.content || '');
  
  // 如果有预先的分析内容，直接使用
  if (options.analysis) {
    try {
      const analysis = decodeURIComponent(options.analysis || '');
      analysisContent.value = parseAnalysis(analysis);
      loading.value = false;
    } catch (err) {
      console.error('解析分析内容失败:', err);
      error.value = '解析失败，请重试';
      loading.value = false;
    }
  } else if (dreamContent.value) {
    // 否则发起请求获取分析
    handleDreamAnalysis(dreamContent.value);
  } else {
    error.value = '未提供梦境内容';
    loading.value = false;
  }
});

// 解析梦境
const handleDreamAnalysis = async (content) => {
  loading.value = true;
  error.value = '';
  
  try {
    const result = await analyzeRequest({
      dreamContent: content,
      additionalInfo: ''
    });
    
    // 检查响应状态和数据
    if (result.statusCode === 200) {
      console.log('响应数据类型:', typeof result.data);
      
      // 尝试解析返回的数据
      if (typeof result.data === 'string') {
        // 如果返回的是字符串，尝试解析为JSON
        try {
          const parsedData = JSON.parse(result.data);
          
          if (parsedData && parsedData.success && parsedData.analysis) {
            analysisContent.value = parseAnalysis(parsedData.analysis);
          } else {
            error.value = (parsedData && parsedData.error) ? parsedData.error : '解析失败，返回数据格式不正确';
          }
        } catch (parseErr) {
          // 如果不是有效的JSON，直接使用字符串作为分析结果
          analysisContent.value = parseAnalysis(result.data);
        }
      } else if (result.data && typeof result.data === 'object') {
        // 如果已经是对象
        if ((result.data.success && result.data.analysis) || (result.data.success && result.data.result)) {
          // 优先使用analysis字段，如果没有则使用result字段
          const analysisText = result.data.analysis || result.data.result;
          analysisContent.value = parseAnalysis(analysisText);
        } else if (result.data.success === false && result.data.error) {
          // 后端返回的错误信息
          error.value = result.data.error;
        } else {
          // 尝试直接使用返回的数据
          const directData = JSON.stringify(result.data);
          analysisContent.value = parseAnalysis(directData);
        }
      } else {
        // 其他情况
        error.value = '解析失败，未知的响应数据格式';
      }
    } else {
      error.value = `请求失败，状态码: ${result.statusCode}`;
    }
  } catch (err) {
    console.error('整体请求处理失败:', err);
    error.value = '网络请求失败，请重试';
  } finally {
    loading.value = false;
  }
};

// 解析分析内容
const parseAnalysis = (analysisText) => {
  try {
    // 首先处理可能的特殊格式
    let cleanText = analysisText;
    
    // 处理可能的JSON字符串中的特殊格式
    if (cleanText.includes('"success":true') && (cleanText.includes('"result"') || cleanText.includes('"analysis"'))) {
      try {
        const jsonData = JSON.parse(cleanText);
        cleanText = jsonData.result || jsonData.analysis || cleanText;
      } catch (e) {
        console.error('尝试解析JSON失败:', e);
      }
    }
    
    // 处理Markdown格式的标题
    cleanText = cleanText.replace(/^#+\s*梦境分析[:：]\s*(.*?)$/gm, '1. 梦境的整体概述\n$1');
    cleanText = cleanText.replace(/^#{1,6}\s*(.*?)$/gm, '');
    
    // 如果没有标准的数字标题格式，尝试添加
    if (!cleanText.match(/\d+\.\s+/)) {
      // 添加默认的分析结构
      cleanText = `1. 梦境的整体概述\n${cleanText}\n\n2. 梦境中关键元素的象征意义\n\n3. 潜意识心理状态分析\n\n4. 与现实生活的关联\n\n5. 建设性的建议和启示`;
    }
    
    // 继续原有的解析逻辑
    const sections = cleanText.split(/\d+\.\s+/).filter(Boolean);
    const titles = [
      '梦境的整体概述',
      '梦境中关键元素的象征意义',
      '潜意识心理状态分析',
      '与现实生活的关联',
      '建设性的建议和启示'
    ];

    return sections.map((content, index) => {
      // 处理内容中的特殊格式
      let processedContent = content.trim();
      
      // 处理标题加粗 (# 符号)
      processedContent = processedContent.replace(/#\s*(.*?)(?:\n|$)/g, '<strong>$1</strong>\n');
      
      // 处理强调内容 (* 符号)
      processedContent = processedContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      
      // 对第一部分(梦境整体概述)进行特殊处理，添加引用样式
      if (index === 0) {
        processedContent = `<div class="dream-overview">${processedContent}</div>`;
      }
      
      // 处理关键词高亮
      const keywords = ['象征', '暗示', '预示', '反映', '表明'];
      keywords.forEach(keyword => {
        processedContent = processedContent.replace(
          new RegExp(`(${keyword})`, 'g'), 
          '<span class="highlight">$1</span>'
        );
      });
      
      return {
        title: titles[index] || `第${index + 1}部分`,
        content: processedContent,
        isRaw: false // 标记内容已经过HTML处理
      };
    });
  } catch (err) {
    console.error('解析分析内容失败:', err);
    // 返回一个基本的分析结构，避免显示空白
    return [
      {
        title: '梦境的整体概述',
        content: `<div class="dream-overview">您梦见的内容可能反映了您内心的某种期待或担忧。</div>`,
        isRaw: false
      },
      {
        title: '解析结果',
        content: analysisText.replace(/^#+\s*梦境分析[:：]\s*/gm, '').trim(),
        isRaw: false
      }
    ];
  }
};

// 重试分析
const retryAnalysis = () => {
  if (dreamContent.value) {
    handleDreamAnalysis(dreamContent.value);
  } else {
    error.value = '未提供梦境内容';
  }
};

</script>

<style scoped>
.dream-detail {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.content-container {
  flex: 1;
  padding: 30rpx;
}

/* 加载动画样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
}

.loading-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 30rpx;
}

.loading-circle {
  width: 20rpx;
  height: 20rpx;
  background-color: #ff85a2;
  border-radius: 50%;
  margin: 0 10rpx;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-circle:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-circle:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
}

.loading-text {
  font-size: 28rpx;
  color: #666;
}

/* 错误样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
}

.error-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.error-message {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  margin-bottom: 30rpx;
}

.retry-button {
  background-color: #ff85a2;
  color: #fff;
  font-size: 28rpx;
  padding: 16rpx 40rpx;
  border-radius: 40rpx;
  border: none;
}

/* 梦境内容样式 */
.dream-content {
  padding-bottom: 40rpx;
}

.dream-query {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
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

.dream-overview {
  background-color: #f9f0f2;
  padding: 16rpx;
  border-left: 8rpx solid #ff85a2;
  margin-bottom: 16rpx;
}

.highlight {
  color: #ff85a2;
  font-weight: bold;
}

.section-content :deep(em) {
  font-style: italic;
  color: #666;
}

.section-content :deep(strong) {
  font-weight: bold;
  color: #ff85a2;
  display: block;
  margin: 10rpx 0;
}

/* 添加流式动画效果 */
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