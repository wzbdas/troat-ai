<template>
  <view class="page-container">
 <view class="content-container">
   <!-- 轮播图部分 -->
   <view class="swiper-container">
     <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true" indicator-active-color="#8957e5">
       <swiper-item v-for="(item, index) in swiperList" :key="index">
         <view class="swiper-item">
           <img :src="item.imgSrc" class="taro-image" style="width: 100%; height: 100%;" />
           <view class="swiper-title">
             <text class="title-tag">{{ item.tag }}</text>
             <text class="title-text">{{ item.title }}</text>
             <text class="title-date">{{ item.date }}</text>
           </view>
         </view>
       </swiper-item>
     </swiper>
   </view>
   <view class="moreactive">
     <view>参与更多</view>
     <view @click="handleCreateActivity">创建活动</view>
   </view>
 </view>
 <view class="linkswipe">
   <img src="/src/static/zximgh5/dashi.png" alt="">
   <img src="/src/static/zximgh5/jiemeng.png" alt="">
   <img src="/src/static/zximgh5/lingshu.png" alt="">
   <img src="/src/static/zximgh5/peidui.png" alt="">
   <img src="/src/static/zximgh5/xingge.png" alt="">
   <img src="/src/static/zximgh5/zhanbu.png" alt="">
 </view>
 <!-- 文章部分 -->
 <view>
   <scroll-view class="articles-container" scroll-y @scrolltolower="handleScroll">
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
         <text class="article-date">{{ formatDate(article.fabuTime) }}</text>
         <view class="article-stats">
           <text>阅读 {{ article.read_count || 0 }}</text>
           <text>点赞 {{ article.good || 0 }}</text>
           <text>收藏 {{ article.collect || 0 }}</text>
         </view>
       </view>
     </view>
   </view>
   <view v-if="loading" class="loading">加载中...</view>
   <view v-if="!hasMore" class="no-more">没有更多了</view>
 </scroll-view>
</view>
</view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getArticleList } from '../../../servers/star'
const hasMore = ref(true)
const swiperList = ref([
 {
   imgSrc: '/src/static/zximgh5/aisha.jpg',
   tag: '塔罗运势',
   title: '塔罗牌牌友交流会',
   date: '(4.7-4.13)'
 },
 {
   imgSrc: '/src/static/zximgh5/aisha1.jpg',
   tag: '塔罗运势',
   title: '爱莎公主12星座一周塔罗运势',
   date: '(4.7-4.13)'
 },
 {
   imgSrc: '/src/static/zximgh5/aisha2.jpg',
   tag: '塔罗运势',
   title: '爱莎公主12星座一周塔罗运势',
   date: '(4.7-4.13)'
 }
])

const pageSize = 10
const currentPage = ref(1)
const loading = ref(false)
const allArticles = ref([])  // 清空模拟数据

// 获取文章列表
const fetchArticles = async () => {
 try {
   loading.value = true;
   const response = await 
   getArticleList();

   if (response.data.code === 200) {
     const newData = response.data.data || [];
     console.log('获取到的数据:', newData); // 添加调试日志

     if (currentPage.value === 1) {
       allArticles.value = newData;
     } else {
       allArticles.value = [...allArticles.value, ...newData];
     }

     hasMore.value = newData.length > 0;
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
 return `${date.getMonth() + 1}月${date.getDate()}日`;
}

const displayArticles = computed(() => {
 return allArticles.value.slice(0, currentPage.value * pageSize)
})

const truncateText = (text, length) => {
 if (!text) return '';
 return text.length > length ? text.slice(0, length) + '...' : text;
}

const handleArticleClick = (article) => {
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

const handleCreateActivity = () => {
 uni.navigateTo({
 url: '/pages/star/zx-addactive'
})
}
</script>

<style scoped>
.page-container {
 width: 100%;
 max-width: 2000rpx;
 margin: 0 auto;
 padding: 20rpx;
 box-sizing: border-box;
 background-color: #f5f5f5;
}

.content-container {
 /* display: flex; */
 width: 100%;
 gap: 20rpx;
 margin-bottom: 20rpx;
}

.swiper-container {
 width: 100%;
}
.swiper {
 width: 100%;
 height: 600rpx;
}

.swiper-item {
 position: relative;
 width: 100%;
 height: 100%;
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
 background: #8957e5;
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

.linkswipe {
 display: flex;
 justify-content: space-between;
 width: 100%;
 gap: 20rpx;
}

.linkswipe img {
 width: calc(16.666% - 17rpx);
 height: auto;
 border-radius: 12rpx;
}

.articles-container {
 height: calc(100vh - 800rpx); /* 调整高度以适应内容 */
 overflow-y: auto;
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
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-top: auto;
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
.article-tag {
 flex-shrink: 0;
 background-color: #8957e5;
 color: #fff;
 padding: 4rpx 12rpx;
 border-radius: 6rpx;
 font-size: 24rpx;
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
 background-color: #8957e5;
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
 background-color: #8957e5;
 color: #fff;
 padding: 16rpx 24rpx;
 border-radius: 8rpx;
 font-size: 28rpx;
 text-align: center;
 box-shadow: 0 2rpx 10rpx rgba(137, 87, 229, 0.2);
 transition: all 0.3s ease;
}

.moreactive view:hover {
 background-color: #7445c7;
 transform: translateY(-2rpx);
 box-shadow: 0 4rpx 15rpx rgba(137, 87, 229, 0.3);
}
</style>