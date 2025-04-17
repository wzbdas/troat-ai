<template>
  <view class="three-spread">
    <view class="spread-title">三张牌阵 - 过去、现在、未来</view>
    <view class="spread-description">
      三张牌阵是最基础也最常用的塔罗牌阵之一，代表过去、现在和未来的能量流动。
    </view>
    
    <view class="cards-container">
      <view class="card-position" v-for="(position, index) in positions" :key="index">
        <view class="card" :class="{ 'card-selected': selectedCards[index] }" @tap="selectCard(index)">
          <view class="card-front" v-if="selectedCards[index]">
            <image class="card-image" :src="selectedCards[index].image" mode="aspectFill"></image>
          </view>
          <view class="card-back" v-else>
            <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
          </view>
        </view>
        <view class="position-label">{{ position.label }}</view>
        <view class="position-meaning">{{ position.meaning }}</view>
      </view>
    </view>
    
    <view class="action-buttons">
      <button class="action-button shuffle-button" @tap="shuffleCards">洗牌</button>
      <button class="action-button reset-button" @tap="resetCards">重置</button>
    </view>
    
    <view class="reading-result" v-if="isReadingComplete">
      <view class="result-title">塔罗解读</view>
      <view class="result-content">
        {{ generateReading() }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 定义牌位信息
const positions = [
  { label: '过去', meaning: '影响当前情况的过去事件或能量' },
  { label: '现在', meaning: '当前面临的情况或挑战' },
  { label: '未来', meaning: '可能的结果或即将到来的能量' }
]

// 模拟塔罗牌组
const tarotDeck = ref([
  { id: 1, name: '权杖2', image: '/src/static/zxqzimg/权杖2.jpg' },
  { id: 2, name: '权杖3', image: '/src/static/zxqzimg/权杖3.jpg' },
  { id: 3, name: '权杖4', image: '/src/static/zxqzimg/权杖4.jpg' },
  { id: 4, name: '圣杯5', image: '/src/static/zxsbimg/圣杯5.jpg' },
  { id: 5, name: '圣杯6', image: '/src/static/zxsbimg/圣杯6.jpg' },
  { id: 6, name: '宝剑7', image: '/src/static/zxbjimg/宝剑7.jpg' },
  { id: 7, name: '宝剑8', image: '/src/static/zxbjimg/宝剑8.jpg' },
  { id: 8, name: '星币9', image: '/src/static/zxxbimg/星币9.jpg' },
  { id: 9, name: '星币10', image: '/src/static/zxxbimg/星币10.jpg' }
])

// 已选择的卡牌
const selectedCards = ref([null, null, null])

// 判断是否完成解读
const isReadingComplete = computed(() => {
  return selectedCards.value.every(card => card !== null)
})

// 选择卡牌
const selectCard = (position) => {
  if (selectedCards.value[position] === null) {
    // 从牌组中随机选择一张牌
    const availableCards = tarotDeck.value.filter(card => 
      !selectedCards.value.some(selected => selected && selected.id === card.id)
    )
    
    if (availableCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCards.length)
      selectedCards.value[position] = availableCards[randomIndex]
    }
  }
}

// 洗牌
const shuffleCards = () => {
  // 重置已选择的卡牌
  selectedCards.value = [null, null, null]
  
  // 打乱牌组顺序
  for (let i = tarotDeck.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tarotDeck.value[i], tarotDeck.value[j]] = [tarotDeck.value[j], tarotDeck.value[i]]
  }
}

// 重置
const resetCards = () => {
  selectedCards.value = [null, null, null]
}

// 生成解读结果
const generateReading = () => {
  if (!isReadingComplete.value) return ''
  
  return `根据您抽到的卡牌，过去的${selectedCards.value[0].name}显示您曾经经历过的挑战和成长；
现在的${selectedCards.value[1].name}反映了您当前面临的情况和能量；
而未来的${selectedCards.value[2].name}则预示着接下来可能的发展方向。
这三张牌共同构成了一个能量流动的故事，建议您关注从过去到现在的变化，以及如何利用当前能量创造理想的未来。`
}
</script>

<style scoped>
.three-spread {
  padding: 20rpx;
}

.spread-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
  color: #ff4c8d;
}

.spread-description {
  font-size: 28rpx;
  text-align: center;
  margin-bottom: 40rpx;
  color: #666;
  padding: 0 30rpx;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  margin: 50rpx 0;
}

.card-position {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.card {
  width: 160rpx;
  height: 280rpx;
  perspective: 1000rpx;
  margin-bottom: 20rpx;
  cursor: pointer;
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-image, .back-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.position-label {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: #333;
}

.position-meaning {
  font-size: 24rpx;
  text-align: center;
  color: #666;
  height: 80rpx;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 30rpx;
  margin: 40rpx 0;
}

.action-button {
  padding: 16rpx 40rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
}

.shuffle-button {
  background-color: #ff4c8d;
  color: white;
}

.reset-button {
  background-color: #f5f5f5;
  color: #666;
}

.reading-result {
  margin-top: 50rpx;
  padding: 30rpx;
  background-color: #f9f9f9;
  border-radius: 16rpx;
}

.result-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #ff4c8d;
}

.result-content {
  font-size: 28rpx;
  line-height: 1.6;
  color: #333;
}
</style>