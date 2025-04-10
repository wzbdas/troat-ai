<template>
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
  </view>
</template>

<script setup>
import { ref } from 'vue'
const swiperList = ref([
  {
    imgSrc: 'src/static/zximgh5/艾莎公主.jpg',
    tag: '塔罗运势',
    title: '爱莎公主12星座一周塔罗运势',
    date: '(4.7-4.13)'
  },
  {
    imgSrc: 'src/static/zximgh5/艾莎公主1.jpg',
    tag: '塔罗运势',
    title: '爱莎公主12星座一周塔罗运势',
    date: '(4.7-4.13)'
  },
  {
    imgSrc: 'src/static/zximgh5/爱莎公主2.jpg',
    tag: '塔罗运势',
    title: '爱莎公主12星座一周塔罗运势',
    date: '(4.7-4.13)'
  }
])
</script>

<style scoped>
.content-container{
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #e37894;
  padding: 20rpx;
  margin: 0 auto;
  gap: 20rpx;
}
.swiper-container {
  flex: 2;
  max-width: 750rpx;
}

.swiper {
  width: 100%;
  height: 400rpx;
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


</style>