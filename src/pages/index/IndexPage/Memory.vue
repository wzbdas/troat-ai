<template>
  <view class="memory-container">
    <view class="memory-list" v-if="memoryList.length > 0">
      <view class="memory-item" v-for="(item, index) in memoryList" :key="index">
        <view>
          <text class="memory-title">对{{ getDollName(item.doll_id) }}说</text>
        </view>
        <view>
          <text class="memory-text">{{ item.memory_text }}</text>
        </view>
        <view>
          <text class="memory-date">{{ formatTime(item.created_at) }}</text>
        </view>
        <view>
          <button @click="handleDeleteMemory(item.id)" class="delete-btn">删除</button>
        </view>
      </view>
    </view>

    <view class="empty-state" v-else-if="!isLoading">
      <text class="empty-text">暂无回忆，去倾诉页面创建吧~</text>
    </view>

    <view class="bottom-text" v-if="memoryList.length > 0">— 到底了 —</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getMemoryList, getDollList, deleteMemory } from '../../../servers/index';

// 是否正在加载
const isLoading = ref(true);

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

// 定义回忆列表
const memoryList = ref([]);
// 娃娃列表数据
const dollList = ref([]);

// 获取娃娃名称
const getDollName = (dollId: number) => {
  if (!dollList.value.length || !dollId) return '未知娃娃';
  const doll = dollList.value.find(d => d.id === dollId);
  return doll ? doll.name : '未知娃娃';
};

// 获取回忆列表
const fetchMemoryList = async () => {
  isLoading.value = true;
  try {
    const res = await getMemoryList();
    if (res && res.data) {
      memoryList.value = res.data.data;
    } 
  } catch (error) {
    console.error('获取回忆列表失败:', error);
    uni.showToast({
      title: '获取回忆列表失败',
      icon: 'none'
    });
  } finally {
    isLoading.value = false;
  }
};

// 获取娃娃列表
const fetchDollList = async () => {
  try {
    const res = await getDollList();
    if (res && res.data) {
      dollList.value = res.data.data;
    }
  } catch (error) {
    console.error('获取娃娃列表失败:', error);
    uni.showToast({
      title: '获取娃娃列表失败',
      icon: 'none'
    });
  }
};

// 页面加载时获取数据
onMounted(() => {
  Promise.all([fetchMemoryList(), fetchDollList()]);
});

// 删除回忆
const handleDeleteMemory = async (memoryId: number) => {
  uni.showModal({
    title: '确认删除',
    content: '确认要删除这条回忆吗？',
    success: (res) => {
      if (res.confirm) {
        deleteMemory({id: memoryId}).then(res => {
          if (res.data.code === 200) {
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            });
            fetchMemoryList();
          } else {
            uni.showToast({
              title: res.data.msg || '删除失败',
              icon: 'none'
            });
          }
        }).catch(error => {
          console.error('删除回忆失败:', error);
          uni.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none'
          });
        });
      }
    } 
  });
};
</script>

<style scoped>
.memory-container {
  min-height: 100vh;
  background: white;
  padding: 20rpx;
}
.memory-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 20rpx;
}

.memory-item {
  background: linear-gradient(135deg, #87CEEB, #4169E1);
  border-radius: 20rpx;
  padding: 25rpx;
  position: relative;
  margin-bottom: 20rpx;
  box-shadow: 0 6rpx 15rpx rgba(65, 105, 225, 0.2);
  transition: transform 0.3s ease;
}

.memory-item:active {
  transform: scale(0.98);
}

.memory-title {
  font-size: 30rpx;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 15rpx;
  display: block;
}

.memory-text {
  font-size: 28rpx;
  color: #ffffff;
  line-height: 1.6;
  margin: 15rpx 0;
  display: block;
  word-break: break-all;
}

.memory-date {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-bottom: 40rpx;
}

.delete-btn {
  background: linear-gradient(135deg, #a8c7fa, #7a9fe4);
  color: #ffffff;
  font-size: 26rpx;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  border: none;
  position: absolute;
  bottom: 15rpx;
  right: 15rpx;
  width: auto;
  height: auto;
  line-height: 1.5;
  box-shadow: 0 4rpx 10rpx rgba(122, 159, 228, 0.4);
  transition: all 0.3s ease;
}

.delete-btn:active {
  transform: scale(0.95);
  opacity: 0.9;
  background: linear-gradient(135deg, #97b6e9, #6a8fd3);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.empty-text {
  color: #aaaaaa;
  font-size: 28rpx;
  text-align: center;
}

.bottom-text {
  text-align: center;
  color: #aaaaaa;
  font-size: 24rpx;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}
</style>
