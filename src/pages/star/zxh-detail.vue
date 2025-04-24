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
      <view class="interaction-bar">
    <view class="interaction-item" @tap="handleLike">
      <image 
        class="interaction-icon" 
        :src="isLiked ? '/src/static/zximgh5/like-active.png' : '/src/static/zximgh5/like.png'" 
        mode="aspectFit"
      />
      <text :class="['interaction-text', { 'active': isLiked }]">点赞 {{ articleData.good || 0 }}</text>
    </view>
    <view class="interaction-item" @tap="handleCollect">
      <image 
        class="interaction-icon" 
        :src="isCollected ? '/src/static/zximgh5/collect-active.png' : '/src/static/zximgh5/collect.png'" 
        mode="aspectFit"
      />
      <text :class="['interaction-text', { 'active': isCollected }]">收藏 {{ articleData.collect || 0 }}</text>
    </view>
  </view>
    </view>
    <!-- 用户评论区域 -->
    <view class="comment-section">


    <!-- 评论列表 -->
    <view class="comment-list">
      <view v-for="comment in comments" :key="comment.id" class="comment-item">
        <image class="comment-avatar" :src="comment.avatar || '/src/static/zximgh5/default-avatar.png'" mode="aspectFill" />
        <view class="comment-content">
          <view class="comment-header">
            <text class="comment-username">{{ comment.username }}</text>
            <text class="comment-time">{{ formatDate(comment.create_time) }}</text>
          </view>
          <text class="comment-text">{{ comment.context }}</text>
        </view>
      </view>
    </view>

        <!-- 评论输入区 -->
        <view class="comment-input-area">
      <image class="user-avatar" :src="currentUser.avatar || '/src/static/zximgh5/default-avatar.png'" mode="aspectFill" />
      <view class="comment-input-wrapper">
        <input 
          v-model="commentText" 
          class="comment-input" 
          placeholder="说点什么吧..." 
          @confirm="handleAddComment"
        />
        <button class="submit-btn" @tap="handleAddComment">发送</button>
      </view>
    </view>
  </view>

  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { updateArticleStats,getComments,addComment,updateArticleState,getArticleDetail } from '@/servers/star'
const articleData = ref({});
const isPlaying = ref(false);
let speechUtterance = null;
let speechSynthesis = null;
const isLiked = ref(false)
const isCollected = ref(false)
//设置关于评论的响应式数据
const comments = ref([])
const commentText = ref('')
// 评论区域当前用户
const userInfo = localStorage.getItem('userInfo');
const userInfoObj = userInfo ? JSON.parse(userInfo) : null;
const currentUser = ref({
  id: userInfoObj?.id || 1,
  username: userInfoObj?.nickname || userInfoObj?.name || '匿名用户',
  avatar: userInfoObj?.avatarUrl || userInfoObj?.img || '/src/static/zximgh5/default-avatar.png'
})

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 获取文章详情
const fetchArticleDetail = async (id) => {
  try {
    const response = await getArticleDetail(id);

    if (response.data.code === 200) {
      const article = response.data.data.find(item => item.id === parseInt(id));
      if (article) {
        // 先更新阅读量
        const newReadCount = (article.read_count || 0) + 1;
        await updateArticleStats({
          id: article.id,
          read_count: newReadCount
        });
        
        // 更新本地数据
        article.read_count = newReadCount;
        articleData.value = article;
        isLiked.value = article.islike === 1;
        isCollected.value = article.iscollect === 1;
        
        // 初始化语音播报
        initSpeech();
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
const handleUpdateStats = async (id, stats) => {
  try {
    const response = await updateArticleStats({
      id,
      ...stats
    });
    
    if (response.data.code !== 200) {
      uni.showToast({
        title: '操作失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('更新文章统计失败:', error);
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
  }
}

const handleLike = async () => {
  if (!articleData.value.id) return;
  
  const newValue = !isLiked.value;
  const newCount = (articleData.value.good || 0) + (newValue ? 1 : -1);
  
  try {
    // 同时更新数量和状态
    await Promise.all([
      updateArticleStats({
        id: articleData.value.id,
        good: newCount
      }),
      updateArticleState({
        id: articleData.value.id,
        islike: newValue ? 1 : 0
      })
    ]);
    
    // 更新成功后修改前端状态
    isLiked.value = newValue;
    articleData.value.good = newCount;
  } catch (error) {
    console.error('点赞失败:', error);
    uni.showToast({
      title: '操作失败',
      icon: 'none'
    });
  }
}

// 修改收藏处理函数
const handleCollect = async () => {
  if (!articleData.value.id) return;
  
  const newValue = !isCollected.value;
  const newCount = (articleData.value.collect || 0) + (newValue ? 1 : -1);
  
  try {
    // 同时更新数量和状态
    await Promise.all([
      updateArticleStats({
        id: articleData.value.id,
        collect: newCount
      }),
      updateArticleState({
        id: articleData.value.id,
        iscollect: newValue ? 1 : 0
      })
    ]);
    
    // 更新成功后修改前端状态
    isCollected.value = newValue;
    articleData.value.collect = newCount;
  } catch (error) {
    console.error('收藏失败:', error);
    uni.showToast({
      title: '操作失败',
      icon: 'none'
    });
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
  // 使用 options 获取参数
  const id = currentPage?.$page?.options?.id;
  
  if (!id) {
    uni.showToast({
      title: '参数错误',
      icon: 'none'
    });
    return;
  }
  
  fetchArticleDetail(id);
  fetchComments(id);

  // 监听用户信息变化
  uni.$on('updateUserInfo', () => {
    const newUserInfo = uni.getStorageSync('userInfo');
    if (newUserInfo) {
      const newUserInfoObj = JSON.parse(newUserInfo);
      currentUser.value = {
        id: newUserInfoObj?.id || currentUser.value.id,
        username: newUserInfoObj?.nickname || newUserInfoObj?.name || currentUser.value.username,
        avatar: newUserInfoObj?.avatarUrl || newUserInfoObj?.img || currentUser.value.avatar
      }
    }
  })
});

onUnmounted(() => {
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
  uni.$off('updateUserInfo')
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

// 获取评论列表
const fetchComments = async (articleId) => {
  if (!articleId) {
    console.error('文章ID不能为空');
    return;
  }

  try {
    // 确保传入的 articleId 是数字类型
    const response = await getComments(Number(articleId));
    
    if (response.data?.code === 200) {
      // 获取本地存储的用户信息
      const userInfo = uni.getStorageSync('userInfo');
      const userInfoObj = userInfo ? JSON.parse(userInfo) : null;
      
      comments.value = response.data.data.map(comment => ({
        id: comment.id,
        context: comment.context,
        create_time: comment.create_time,
        // 如果评论的 user_id 与当前登录用户 ID 匹配，使用本地存储的用户信息
        username: comment.user_id === userInfoObj?.id ? userInfoObj.name : (comment.username || '匿名用户'),
        avatar: comment.user_id === userInfoObj?.id ? userInfoObj.img : (comment.avatar || '/src/static/zximgh5/default-avatar.png'),
        user_id: comment.user_id
      }));
    } else {
      throw new Error(response.data?.msg || '获取评论失败');
    }
  } catch (error) {
    console.error('获取评论失败:', error);
    uni.showToast({
      title: error.message || '获取评论失败',
      icon: 'none'
    });
  }
}

// 添加评论
const handleAddComment = async () => {
  if (!commentText.value.trim()) {
    uni.showToast({
      title: '请输入评论内容',
      icon: 'none'
    })
    return
  }

  try {
    const response = await addComment({
      articleId: articleData.value.id,
      usersId: currentUser.value.id,
      context: commentText.value
    })

    if (response.data.code === 200) {
      comments.value.unshift(response.data.data)
      commentText.value = ''
      uni.showToast({
        title: '评论成功',
        icon: 'success'
      })
    }
  } catch (error) {
    console.error('添加评论失败:', error)
    uni.showToast({
      title: '评论失败',
      icon: 'none'
    })
  }
}

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
  margin-bottom: 30rpx;
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

.interaction-bar {
  display: flex;
  justify-content: flex-end;  /* 改为右对齐 */
  gap: 20rpx;  /* 添加间距 */
  padding: 20rpx 0;  /* 移除左右内边距，保留上下内边距 */
  margin-top: 40rpx;  /* 添加与文章内容的间距 */
}

.interaction-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  background-color: #f5f5f5;
  transition: all 0.3s ease;
}

.interaction-icon {
  width: 40rpx;
  height: 40rpx;
}

.interaction-text {
  font-size: 28rpx;
  color: #666;
}

.interaction-text.active {
  color: #f874b8;
}

.interaction-item:active {
  transform: scale(0.95);
}

.detail-container {
  padding-bottom: 0;  /* 移除底部内边距 */
}

.comment-section {
  margin-top: 1rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
}

.comment-input-area {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.comment-input-wrapper {
  flex: 1;
  display: flex;
  gap: 20rpx;
}

.comment-input {
  flex: 1;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  font-size: 28rpx;
}

.submit-btn {
  padding: 10rpx 30rpx;
  background-color: #f874b8;
  color: #fff;
  border-radius: 30rpx;
  font-size: 28rpx;
}

.comment-list {
  margin-top: 20rpx;
}

.comment-item {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.comment-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.comment-username {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.comment-time {
  font-size: 24rpx;
  color: #999;
}

.comment-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.no-comments {
  text-align: center;
  padding: 40rpx 0;
  color: #999;
  font-size: 28rpx;
}
</style>