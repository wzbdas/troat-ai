<template>
  <view class="spread-container">
    <scroll-view scroll-x class="tab-container" :show-scrollbar="false">
      <view class="tab-wrapper">
        <view 
          v-for="(item, index) in tabList" 
          :key="index"
          :class="['tab-item', { active: currentTab === index }]"
          @tap="switchTab(index)"
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>
    
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
:host, body, html {
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
}
.spread-container {
  background-color: #fff; /* 保留用于调试 */
  min-height: 100vh;
  width: 100%; /* 使用 100% 而非 100vw */
  max-width: 100%; /* 严格限制最大宽度为视口 */
  box-sizing: border-box;
  overflow-x: hidden; /* 禁止水平溢出 */
  overflow-y: auto; /* 允许垂直滚动 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0; /* 移除可能的外边距 */
  padding: 0; /* 移除内边距，交由子容器控制 */
}

.tab-container {
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 30rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}

.tab-wrapper {
  display: inline-flex;
  gap: 20rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  width: max-content; /* 保持内容宽度 */
  justify-content: flex-start;
}

.tab-item {
  padding: 16rpx 30rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: inline-block;
}

.tab-item.active {
  background: #ffd1e0;
  color: #ff4c8d;
  box-shadow: 0 4rpx 8rpx rgba(255, 76, 141, 0.2);
}

.content-container {
  width: 100%;
  max-width: 100%; /* 防止内容区域溢出 */
  flex: 1;
  overflow-y: auto; /* 允许内容区域垂直滚动 */
  overflow-x: hidden; /* 禁止水平溢出 */
  box-sizing: border-box;
  padding: 0 20rpx;
  position: relative;
}
.spread-container::-webkit-scrollbar,
.tab-container::-webkit-scrollbar,
.content-container::-webkit-scrollbar {
  display: none;
}

.spread-container,
.tab-container,
.content-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 确保子组件内容不超过容器宽度 */
.content-container > * {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden; /* 额外防止子组件溢出 */
  box-sizing: border-box;
}
</style>