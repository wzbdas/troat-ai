<template>
  <view class="tarot-container">
    <view class="tarot-header">
      <view class="tarot-title">我的塔罗解读记录</view>
    </view>
    
    <view class="tarot-list" v-if="tarotRecords.length > 0">
      <view class="tarot-item" 
            v-for="(record, index) in tarotRecords" 
            :key="index"
            @tap="goToDetail(record)">
        <view class="tarot-item-header">
          <!-- <text class="tarot-date">{{ formatDate(record.create_time) }}</text> -->
          <!-- <text class="tarot-type">{{ record.spread_type || '单卡解读' }}</text> -->
        </view>
        <view class="tarot-item-content">
          <text class="tarot-question">{{ record.question || '未设置问题' }}</text>
          <!-- <text class="tarot-cards">{{ record.cards_drawn || '未记录卡牌' }}</text> -->
        </view>
        <!-- <view class="tarot-item-footer">
          <text class="tarot-result">{{ truncateText(record.interpretation, 50) }}</text> 
        </view> -->
      </view>
    </view>
    
    <view class="empty-state" v-else>
      <text class="empty-text">暂无塔罗解读记录</text>
    </view>
    
    <view class="loading-container" v-if="isLoading">
      <text class="loading-text">加载中...</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 塔罗牌解读记录
const tarotRecords = ref<any[]>([]);
const isLoading = ref(true);

// 获取用户ID
const getUserId = () => {
  try {
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      const userObj = JSON.parse(userInfo);
      return userObj.id || userObj.userId || '';
    }
    return '';
  } catch (e) {
    console.error('获取用户ID失败:', e);
    return '';
  }
};

// 获取塔罗牌解读记录
const fetchTarotRecords = async () => {
  isLoading.value = true;
  const userId = getUserId();
  
  if (!userId) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    isLoading.value = false;
    return;
  }
  
  try {
    const response = await uni.request({
      url: 'http://localhost:3000/users/getTarotRecords',
      method: 'GET',
      data: {
        userId
      }
    });
    
    if (response.statusCode === 200 && response.data.code === 200) {
      tarotRecords.value = response.data.data || [];
    } else {
      uni.showToast({
        title: response.data.msg || '获取记录失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('请求塔罗记录失败:', error);
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
  } finally {
    isLoading.value = false;
  }
};

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return '未知时间';
  
  try {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  } catch (e) {
    return dateStr;
  }
};

// 截断文本
const truncateText = (text: string, maxLength: number) => {
  if (!text) return '无解读结果';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// 跳转到塔罗牌页面
const goToTarot = () => {
  uni.navigateTo({
    url: '/pages/tarot/tarot'
  });
};

// 添加跳转到详情页的方法
const goToDetail = (record: any) => {
  // 将记录数据存储到本地，以便在详情页获取
  uni.setStorageSync('currentTarotRecord', JSON.stringify(record));
  
  // 跳转到详情页
  uni.navigateTo({
    url: '/pages/my/component/jie'
  });
};

// 页面加载时获取数据
onMounted(() => {
  fetchTarotRecords();
});
</script>

<style scoped>
.tarot-container {
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.tarot-header {
  margin-bottom: 30rpx;
}

.tarot-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  padding: 10rpx 0;
}

.tarot-list {
  width: 100%;
}

.tarot-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  position: relative; /* 添加相对定位 */
}

/* 添加点击效果 */
.tarot-item:active {
  background-color: #f9f9f9;
  transform: scale(0.98);
  transition: all 0.2s;
}

.tarot-item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.tarot-date {
  font-size: 24rpx;
  color: #999;
}

.tarot-type {
  font-size: 24rpx;
  color: #ff6b9d;
  font-weight: 500;
}

.tarot-item-content {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20rpx;
  margin-bottom: 20rpx;
}

.tarot-question {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 10rpx;
  display: block;
}

.tarot-cards {
  font-size: 26rpx;
  color: #666;
  display: block;
}

.tarot-item-footer {
  padding-top: 10rpx;
}

.tarot-result {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  width: 100%;
}

.empty-text {
  font-size: 30rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.start-btn {
  background-color: #ff6b9d;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  border: none;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 40rpx 0;
}

.loading-text {
  font-size: 28rpx;
  color: #999;
}
</style>