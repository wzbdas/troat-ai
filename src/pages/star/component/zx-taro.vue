<template>
  <scroll-view class="page-container"  scroll-y @scrolltolower="handleScroll">
 <view class="content-container">
   <!-- 轮播图部分 -->
   <view class="swiper-container">
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true" indicator-active-color="#8957e5">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <view class="swiper-item">
          <img :src="item.img || '/src/static/zximgh5/default.jpg'" class="taro-image" style="width: 100%; height: 100%;" />
          <view class="swiper-title">
            <text class="title-tag">{{ item.class || '塔罗' }}</text>
            <text class="title-text">{{ item.title }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
  <view class="moreactive">
     <view @click="handleMoreActive">进入活动</view>
     <view @click="handleCreateActivity">创建活动</view>
   </view>
 </view>
 <scroll-view 
    class="linkswipe-container" 
    scroll-x 
    :show-scrollbar="false"
    enhanced
    :bounces="true"
  >
    <view class="linkswipe">
      <img 
        v-for="(img, index) in imgList" 
        :key="index"
        :src="img.src" 
        :alt="img.alt"
        @tap="handleImgClick(index)"
        :class="{ 'zoom-effect': activeIndex === index }"
      >
    </view>
  </scroll-view>
 <!-- 文章部分 -->
 <view class="articles-wrapper">
   <view class="article-item" v-for="(article, index) in displayArticles" :key="article.id">
     <view class="article-image">
       <img :src="article.img || '/src/static/zximgh5/default.jpg'" alt="">
     </view>
     <view class="article-content">
       <view class="article-header">
   <view class="title-wrapper">
     <text class="article-tag">{{ article.class || '塔罗' }}</text>
     <text class="article-title" @click="handleArticleClick(article)">{{ article.title }}</text>
   </view>
 </view>
       <view class="article-text">{{ truncateText(article.context, 15) }}</view>
       <view class="article-footer">
  <view class="article-meta">
    <text class="article-date">{{ formatDate(article.fabuTime) }}</text>
    <text class="separator">·</text>
    <view class="article-stats">
      <text>阅读 {{ article.read_count || 0 }}</text>
      <text class="separator">·</text>
      <text>点赞 {{ article.good || 0 }}</text>
      <text class="separator">·</text>
      <text>收藏 {{ article.collect || 0 }}</text>
    </view>
  </view>
</view>
     </view>
   </view>
   <view v-if="loading" class="loading">加载中...</view>
   <view v-if="!hasMore" class="no-more">没有更多了~</view>
</view>
  </scroll-view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getArticleList } from '../../../servers/star'
const hasMore = ref(true)

const pageSize = 10
const currentPage = ref(1)
const loading = ref(false)
const swiperList = ref([])
const allArticles = ref([])  // 清空模拟数据

// 获取文章列表
const fetchArticles = async () => {
  try {
    loading.value = true;
    const response = await getArticleList();

    if (response.data.code === 200) {
      const newData = response.data.data || [];
      // 取前3篇文章作为轮播图数据
      if (currentPage.value === 1) {
        swiperList.value = newData.slice(0, 3);
        allArticles.value = newData;
      } else {
        // 追加新数据
        allArticles.value = [...allArticles.value, ...newData];
      }
      // 判断是否还有更多数据
      hasMore.value = newData.length === pageSize;
    } else {
      uni.showToast({
        title: '获取文章列表失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取文章列表失败:', error);
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
}

// 添加日期格式化函数
const formatDate = (dateStr) => {
 if (!dateStr) return '';
 const date = new Date(dateStr);
 return `${date.getMonth() + 1}.${date.getDate()}`;
}

const displayArticles = computed(() => {
 return allArticles.value.slice(0, currentPage.value * pageSize)
})

const truncateText = (text, length) => {
 if (!text) return '';
 return text.length > length ? text.slice(0, length) + '...' : text;
}

const handleArticleClick = (article) => {
  if (!article?.id) return;
  uni.navigateTo({
    url: `/pages/star/zxh-detail?id=${article.id}`
  })
}

// 滚动加载处理函数
const handleScroll = async () => {
  if (!hasMore.value || loading.value) return;
  currentPage.value++;
  await fetchArticles();
}

// 页面加载时获取数据
onMounted(() => {
 fetchArticles()
})

// 添加参与更多跳转方法
const handleMoreActive = () => {
  uni.navigateTo({
    url: '/pages/star/active'
  })
}
// 添加活动跳转方法
const handleCreateActivity = () => {
 uni.navigateTo({
 url: '/pages/star/zx-addactive'
})
}

// 图片列表数据
const imgList = ref([
 { src: '/src/static/zximgh5/dashi.png', alt: '大师',path:'/pages/star/zx-dashi' },
 { src: '/src/static/zximgh5/jiemeng.png', alt: '解梦',path:'/pages/star/zx-jiemeng'},
 { src: '/src/static/zximgh5/lingshu.png', alt: '灵数' },
 { src: '/src/static/zximgh5/peidui.png', alt: '配对' },
 { src: '/src/static/zximgh5/xingge.png', alt: '性格',path:'/pages/index/IndexPage/HeartTest' },
 { src: '/src/static/zximgh5/zhanbu.png', alt: '占卜' }
])

// 当前激活的图片索引
const activeIndex = ref(null)

// 处理大师等图片点击
const handleImgClick = (index) => {
  activeIndex.value = index;
  // 添加页面跳转
  const targetPath = imgList.value[index].path;
  if (targetPath) {
    uni.navigateTo({
      url: targetPath,
      fail: (err) => {
        console.error('页面跳转失败:', err);
        uni.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  }
  setTimeout(() => {
    activeIndex.value = null;
  }, 300);
}
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.content-container {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20rpx;
  padding-top: 20rpx; /* 添加顶部内边距 */
}

.swiper-container {
  width: 100%;
  box-sizing: border-box;
  margin-top: 0;
  overflow: visible; /* 允许内容溢出，这样圆角就不会被裁切 */
}
.swiper {
  width: 100%;
  height: 500rpx;
  border-radius: 12rpx; /* 给轮播图本身添加圆角 */
  overflow: hidden; /* 确保轮播内容不会溢出圆角边界 */
}

.swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12rpx; /* 给每个轮播项添加圆角 */
  overflow: hidden; /* 确保内容不会溢出圆角边界 */
}

.taro-image {
 width: 100%;
 height: 100%;
 border-radius: 12rpx;
 /* object-fit: cover; */
}

.swiper-title {
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 padding: 20rpx;
 background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
 color: #fff;
 border-radius: 0 0 12rpx 12rpx;
}

.title-tag {
 display: inline-block;
 background: #e557bdb7;
 color: #fff;
 padding: 4rpx 12rpx;
 border-radius: 6rpx;
 font-size: 24rpx;
 margin-right: 12rpx;
}

.title-text {
 font-size: 28rpx;
 margin-right: 12rpx;
}

.title-date {
 font-size: 24rpx;
 color: rgba(255,255,255,0.8);
}

.linkswipe-container {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  white-space: nowrap;
}

.linkswipe {
  display: inline-flex;
  padding: 20rpx 20rpx;
  gap: 30rpx;
}

.linkswipe img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.left-arrow {
  left: 10rpx;
}

.right-arrow {
  right: 10rpx;
}

.arrow-icon {
  color: pink;
  font-size: 32rpx;
  font-weight: bold;
}

.arrow:active {
  background: rgba(255, 255, 255, 0.7);
}

.zoom-effect {
 transform: scale(1.2);
}
.article-date{
  color: black;
}
.articles-wrapper {
  padding: 0 20rpx;
  box-sizing: border-box;
}
.articles-container {
  width: 100%;
  box-sizing: border-box;
}

.loading, .no-more {
 text-align: center;
 padding: 20rpx;
 color: #999;
 font-size: 24rpx;
}

.article-stats {
 display: flex;
 gap: 20rpx;
 font-size: 24rpx;
 color: #999;
}

.article-footer {
  margin-top: 16rpx;
}
.article-meta {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #999;
  gap: 8rpx;
}

.article-stats {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.separator {
  color: #ccc;
  padding: 0 4rpx;
}
.article-item {
 display: flex;
 gap: 20rpx;
 background-color: #fff;
 padding: 20rpx;
 border-radius: 12rpx;
 margin-bottom: 20rpx;
 align-items: flex-start;
}

.article-image {
 width: 200rpx;
 height: 200rpx;
 flex-shrink: 0;
 overflow: hidden;
 border-radius: 8rpx;
}

.article-image img {
 width: 100%;
 height: 100%;
 object-fit: cover;
}

.article-content {
 flex: 1;
 display: flex;
 flex-direction: column;
 gap: 12rpx;
 min-width: 0; /* 防止文本溢出 */
}

.article-header {
 display: flex;
 flex-direction: column;
 gap: 8rpx;
}
.title-wrapper {
 display: flex;
 align-items: center;
 gap: 12rpx;
}
.article-title {
 font-size: 32rpx;
 font-weight: bold;
 color: #333;
 line-height: 1.4;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 cursor: pointer; 
}

.article-title:active {
 opacity: 0.8; 
}

.article-text {
 font-size: 28rpx;
 color: #666;
 line-height: 1.5;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}

.article-tag {
 align-self: flex-start;
 background-color: pink;
 color: #fff;
 padding: 4rpx 12rpx;
 border-radius: 6rpx;
 font-size: 24rpx;
}

.moreactive{
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 20rpx;
 gap: 20rpx;
}

.moreactive view {
 flex: 1;
 background-color: pink;
 color: rgba(17, 18, 17, 0.855);
 padding: 16rpx 24rpx;
 border-radius: 8rpx;
 font-size: 28rpx;
 text-align: center;
 box-shadow: 0 2rpx 10rpx rgba(137, 87, 229, 0.2);
 transition: all 0.3s ease;
}

.moreactive view:hover {
 background-color: #e31bbb;
 transform: translateY(-2rpx);
 box-shadow: 0 4rpx 15rpx rgba(137, 87, 229, 0.3);
}
</style>