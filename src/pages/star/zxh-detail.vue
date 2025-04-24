<template>
  <view class="detail-container">
    <view class="article-header">
      <view class="header-top">
        <text class="article-tag">{{ articleData.class || '塔罗' }}</text>
        <view class="play-control" v-if="articleData.context" @tap="togglePlay">
          <image 
            class="speaker-icon" 
            :src="isPlaying ? '/src/static/zximgh5/speaker-active.png' : '/src/static/zximgh5/speaker.png'" 
            mode="aspectFit"
          />
        </view>
      </view>
      <text class="article-title">{{ articleData.title }}</text>
      <view class="article-meta">
        <text class="article-date">{{ formatDate(articleData.fabuTime) }}</text>
        <view class="article-stats">
          <text>阅读 {{ articleData.read_count || 0 }}</text>
          <text>点赞 {{ articleData.good || 0 }}</text>
          <text>收藏 {{ articleData.collect || 0 }}</text>
        </view>
      </view>
    </view>

    <view class="content">
      <view class="article-content">{{ articleData.context }}</view>
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const articleData = ref({});
const isPlaying = ref(false);
let speechUtterance = null;
let speechSynthesis = null;

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 获取文章详情
const fetchArticleDetail = async (id) => {
  try {
    const response = await uni.request({
      url: 'http://localhost:3000/articles/list',
      method: 'GET'
    });

    if (response.data.code === 200) {
      const article = response.data.data.find(item => item.id === parseInt(id));
      if (article) {
        articleData.value = article;
        // 初始化语音播报
        initSpeech();
        // 更新阅读量
        updateArticleStats(id, { read_count: article.read_count + 1 });
      }
    }
  } catch (error) {
    console.error('获取文章详情失败:', error);
    uni.showToast({
      title: '获取文章详情失败',
      icon: 'none'
    });
  }
}

// 更新文章统计数据
const updateArticleStats = async (id, stats) => {
  try {
    await uni.request({
      url: 'http://localhost:3000/articles/update',
      method: 'POST',
      data: {
        id,
        ...stats
      }
    });
  } catch (error) {
    console.error('更新文章统计失败:', error);
  }
}

// 初始化语音播报
const initSpeech = () => {
  if (!articleData.value.context) return;
  
  speechSynthesis = window.speechSynthesis;
  speechUtterance = new SpeechSynthesisUtterance();
  speechUtterance.lang = 'zh-CN';
  speechUtterance.rate = 1;
  speechUtterance.pitch = 1;
  speechUtterance.text = articleData.value.context;
}

// 获取页面参数并加载数据
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const id = currentPage.$page?.fullPath?.split('?id=')[1];
  if (id) {
    fetchArticleDetail(id);
  }
});

onUnmounted(() => {
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
});

const togglePlay = () => {
  if (isPlaying.value) {
    speechSynthesis.pause();
  } else {
    speechSynthesis.resume();
    if (speechUtterance) {
      speechSynthesis.speak(speechUtterance);
    }
  }
  isPlaying.value = !isPlaying.value;
};
</script>

<style scoped>
.detail-container {
  padding: 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.article-header {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.article-tag {
  display: inline-block;
  background-color: #f874b8;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  font-size: 24rpx;
  margin-bottom: 16rpx;
}

.article-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin: 20rpx 0;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 24rpx;
}

.article-stats {
  display: flex;
  gap: 20rpx;
}

.content {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
  margin-bottom: 100rpx;
}

.article-content {
  font-size: 30rpx;
  line-height: 1.8;
  color: #333;
  text-align: justify;
}

.header-top {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 16rpx;
  padding: 20rpx;
}

.article-tag {
  display: inline-block;
  background-color: #f874b8;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  font-size: 24rpx;
  margin-bottom: 0;
}

.play-control {
  width: 60rpx; 
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.speaker-icon {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.speaker-icon:active {
  transform: scale(0.95);
  opacity: 0.8;
}

</style>