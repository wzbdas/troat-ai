<template>
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
</template>

<script setup>
const tabList = [
  { name: '三张牌阵' },
  { name: '五张牌阵'},
  { name: '六芒星牌阵' },
  { name: '恋人金字塔牌阵' },
  { name: '自定义牌阵' }
]
</script>

<style scoped>
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
}

.tab-item.active {
  background: #ffd1e0;
  color: #ff4c8d;
}
</style>