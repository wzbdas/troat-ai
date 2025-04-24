<template>
  <view class="spread-container">
    <view class="tab-container">
      <view 
        v-for="(item, index) in tabList" 
        :key="index"
        :class="['tab-item', { active: currentTab === index }]"
        @tap="switchTab(index)"
      >
        {{ item.name }}
      </view>
    </view>
    
    <!-- 添加内容容器 -->
    <view class="content-container">
      <!-- 根据当前选中的标签动态渲染组件 -->
      <Three v-if="currentTab === 0" />
      <Five v-if="currentTab === 1" />
      <Six v-if="currentTab === 2" />
      <Love v-if="currentTab === 3" />
      <Zidingyi v-if="currentTab === 4" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Three from '../paizhen/three.vue'
import Five from '../paizhen/five.vue'
import Six from '../paizhen/six.vue'
import Love from '../paizhen/love.vue'
import Zidingyi from '../paizhen/zidingyi.vue'

// 添加当前选中标签的响应式变量
const currentTab = ref(0) // 默认选中第一个标签

const tabList = [
  { name: '三张牌阵' },
  { name: '五张牌阵'},
  { name: '六芒星牌阵' },
  { name: '恋人金字塔牌阵' },
  { name: '自定义牌阵' }
]

// 添加切换标签的方法
const switchTab = (index) => {
  currentTab.value = index
}
</script>

<style scoped>
.spread-container {
  padding: 30rpx;
  background-color: #fff;
  min-height: 100vh;
}

.tab-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.tab-item {
  padding: 16rpx 30rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.tab-item.active {
  background: #ffd1e0;
  color: #ff4c8d;
  box-shadow: 0 4rpx 8rpx rgba(255, 76, 141, 0.2); /* 添加阴影效果 */
}

/* 添加内容容器样式 */
.content-container {
  margin-top: 20rpx;
  min-height: 80vh;
}
</style>