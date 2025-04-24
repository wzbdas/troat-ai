<template>
  <view class="actives-container">
    <view class="header">
      <text class="title">我的活动</text>
    </view>
    
    <view class="activity-list">
      <view class="activity-item" v-for="(item, index) in activities.data" :key="index">
        <image class="activity-image" :src="getImageUrl(item.image)" mode="aspectFill"></image>
        <view class="activity-content">
          <text class="activity-title">{{ item.title }}</text>
          
          <view class="activity-info">
            <text class="info-label">活动时间：</text>
            <text class="info-value">{{ formatTime(item.startTime) }} - {{ formatTime(item.endTime) }}</text>
          </view>
          
          <view class="activity-info">
            <text class="info-label">活动地址：</text>
            <text class="info-value">{{ item.local }}</text>
          </view>
          
        </view>
      </view>
    </view>

    <view class="empty-state" v-if="!activities.data || activities.data.length === 0">
      <text>暂无活动记录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getActive } from '../../../servers/index'

// 添加时间格式化函数
const formatTime = (time: string) => {
  if (!time) return '';
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const activities = ref({
  data: []
})
// 添加图片路径处理函数
const getImageUrl = (image: string) => {
  if (!image) return '/static/default.png'
  if (image.startsWith('http')) return image
  return `http://localhost:3000${image}`
}
const getActives = async () => {
  try {
    // #ifdef MP-WEIXIN
    const result = await uni.request({
      url: 'http://localhost:3000/zactive/active', 
      method: 'GET'
    });
    
    if (result.statusCode === 200 && result.data.code === 200) {
      activities.value = {
        data: result.data.data
      };
    }
    // #endif

    // #ifdef H5
    const res = await getActive()
    if (res.data.code === 200) {
      activities.value = {
        data: res.data.data
      }
    }
    // #endif
    
    console.log('活动列表：', activities.value)
  } catch (error) {
    console.error('获取活动列表失败：', error)
    uni.showToast({
      title: '获取活动列表失败',
      icon: 'none'
    })
  }
}

onMounted(() => {
  getActives()
})
</script>

<style scoped>
.actives-container {
  min-height: 100vh;
  background-color: #fff5f7;
  padding: 2vw;
}

.header {
  padding: 2.5vh 2vw;
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  border-radius: 2vw;
  margin-bottom: 3vh;
}

.title {
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
}

.activity-list {
  padding: 0 1vw;
}

.activity-item {
  background: #ffffff;
  border-radius: 1.6vw;
  margin-bottom: 2vh;
  padding: 2vw;
  display: flex;
  align-items: center;  /* 修改为居中对齐 */
  justify-content: space-between;  /* 左右两端对齐 */
  box-shadow: 0 0.2vw 1vw rgba(255, 154, 158, 0.1);
}

.activity-image {
  width: 20vw;  /* 调整图片尺寸 */
  height: 20vw;
  border-radius: 1.2vw;
  object-fit: cover;  /* 确保图片比例正确 */
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 2vw;  /* 添加左右内边距 */
  justify-content: center;  /* 垂直居中 */
}

.activity-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5vh;
  font-weight: 600;
}

.activity-info {
  display: flex;
  margin-bottom: 1vh;
  align-items: center;  /* 信息行居中对齐 */
}

.info-label {
  font-size: 0.9rem;
  color: #666;
  min-width: 5em;  /* 固定标签宽度 */
}

.info-value {
  font-size: 0.9rem;
  color: #666;
  flex: 1;
}

.highlight {
  color: #ff6b6b;
  font-weight: 500;
}

.activity-status {
  font-size: 1rem;
  padding: 0.3vh 1.4vw;
  border-radius: 2vw;
  display: inline-block;
}

.empty-state {
  text-align: center;
  padding: 10vh 0;
  color: #999;
  font-size: 1.2rem;
}
</style>