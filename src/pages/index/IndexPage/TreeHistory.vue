<template>
  <view class="history-container">
    <view class="page-header">
      <text class="page-title">我的倾诉</text>
    </view>
    
    <view class="history-list">
      <view class="history-item" v-for="(item, index) in historyList" :key="index">
        <view class="content">{{ item.content }}</view>
        <view class="time">{{ formatTime(item.time) }}</view>
        <view class="delete-btn-container">
          <button class="delete-btn" @click="handleDelete(item.id)">删除</button>
        </view>
      </view>
    </view>
    
    <view class="bottom-text">— 到底了 —</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getQingsuList,deleteQingsu } from '../../../servers/index';

// 定义类型
interface QingsuItem {
  time: string;
  content: string;
}

interface QingsuResponse {
  data: {
    data: QingsuItem[];
  };
}

// 定义历史记录列表
const historyList = ref<Array<{id: number, time: string; content: string }>>([]);

// 格式化时间函数
const formatTime = (time: string) => {
  if (!time) return '';
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 获取倾诉列表
const fetchQingsuList = async () => {
  try {
    const res = await getQingsuList() as QingsuResponse;
    if (res && res.data) {
      historyList.value = res.data.data.map(item => ({
        id: item.id,
        time: item.time,
        content: item.content
      }));
    }
  } catch (error) {
    uni.showToast({
      title: '获取倾诉列表失败',
      icon: 'none'
    });
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchQingsuList();
});
// 删除sorpt
const handleDelete = (qingsuid: number) => {
  uni.showModal({
    title: '确认删除',
    content: '确认要删除这一条sorpt吗？',
    success: (res) => {
      if (res.confirm) {

        deleteQingsu({id: qingsuid}).then(res => {
          if (res.data.code === 200) {
            uni.showToast({
              title: '删除成功',
              icon: 'none'
            })
            fetchQingsuList()
          } else {
            uni.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        })
      }
    } 
  })
}
</script>

<style scoped>
.history-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #90EE90, #32CD32);
  padding: 20rpx;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88rpx;
  margin-bottom: 30rpx;
}

.page-title {
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.history-item {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20rpx;
  padding: 20rpx;
  position: relative;
  overflow: hidden;
}

.time {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10rpx;
}

.content {
  font-size: 28rpx;
  color: #ffffff;
  line-height: 1.6;
}

.delete-btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 15rpx;
}

.delete-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 24rpx;
  padding: 6rpx 20rpx;
  border-radius: 30rpx;
  border: 1px solid rgba(255, 255, 255, 0.4);
  line-height: 1.5;
  height: auto;
  box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.delete-btn:active {
  background-color: rgba(255, 0, 0, 0.2);
  transform: scale(0.98);
}

.flower-decoration {
  position: absolute;
  right: 10rpx;
  bottom: 10rpx;
  width: 60rpx;
  height: 60rpx;
  opacity: 0.6;
}

.bottom-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}
</style>