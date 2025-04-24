<template>
  <view class="aiai-container">
    <view class="data-container" v-if="cleanedData && cleanedData.length > 0">
      <view class="data-title">我的问题</view>
      <view class="data-item" v-for="(item, index) in cleanedData" :key="index">
        <view class="item-content">
          <text class="item-text">{{ item }}</text>
        </view>
      </view>
    </view>
    <view class="empty-state" v-else>
      <text class="empty-text">暂无提问记录</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';

// 问题数据
const questionData = ref<string[]>([]);

// 清理后的数据（去除引号、括号等）
const cleanedData = computed(() => {
  return questionData.value.map(item => {
    // 去除引号、方括号等符号
    return String(item).replace(/[\[\]"',]/g, '').trim();
  });
});

// 从本地存储加载问题数据
const loadQuestionData = () => {
  try {
    // 从本地存储获取userQuestions数据
    const questionsStr = uni.getStorageSync('userQuestions');
    if (questionsStr) {
      try {
        // 尝试解析JSON数据
        const parsedData = JSON.parse(questionsStr);
        
        // 直接使用解析后的数据，如果是数组
        if (Array.isArray(parsedData)) {
          questionData.value = parsedData;
        } 
        // 如果不是数组，检查是否有特定结构
        else if (parsedData && typeof parsedData === 'object') {
          // 如果有data属性且是数组
          if (Array.isArray(parsedData.data)) {
            questionData.value = parsedData.data;
          } else {
            // 将对象转为数组
            questionData.value = [JSON.stringify(parsedData)];
          }
        } else {
          // 其他情况
          questionData.value = [String(parsedData)];
        }
      } catch (parseError) {
        console.log('JSON解析失败，将作为纯文本处理');
        questionData.value = [questionsStr];
      }
      console.log('成功加载问题数据:', questionData.value);
    } else {
      console.log('本地存储中没有问题数据');
      questionData.value = [];
    }
  } catch (e) {
    console.error('加载问题数据失败:', e);
    questionData.value = [];
  }
};

// 页面加载时获取数据
onMounted(() => {
  loadQuestionData();
});
</script>

<style scoped>
.aiai-container {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  height: 100vh;
  background-color: #f5f5f5;
}

.data-container {
  width: 100%;
}

.data-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding: 10rpx 0;
}

.data-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-text {
  font-size: 30rpx;
  color: #333;
  line-height: 1.5;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300rpx;
  width: 100%;
}

.empty-text {
  font-size: 30rpx;
  color: #999;
}
</style>